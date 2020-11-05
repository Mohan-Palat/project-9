const router = require('express').Router();
const Drivein = require('../models/drivein');
const Movie = require('../models/movie');

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

// Index Route for Drive-In
router.get('/', async (req, res) => {
  console.log('Index Route');
  console.log(req.body);

  let allDriveins = await Drivein.find({});
  res.render('driveins/index.ejs', { 
    driveins: allDriveins,
    currentUser: req.session.currentUser 
  });
});

// New Route to Request Form for New Drive-In
router.get('/new', isAuthenticated, async (req, res) => {
  let allMovies = await Movie.find({});
  res.render('driveins/new.ejs', { 
    movies: allMovies,
    currentUser: req.session.currentUser
   });
});

// Edit Route for Drive-In
// Get Edit Page for Drive-In
router.get('/:driveinId/edit', isAuthenticated, (req, res) => {
  // set the value of the Drive-In ID
  const driveinId = req.params.driveinId;

  // find Drive-In in db by Drive-In ID
  Drivein.findById(driveinId, (err, foundDrivein) => {
    res.render('driveins/edit.ejs', { 
      foundDrivein,
      currentUser: req.session.currentUser
    });
  });
});

// Show Route for Drive-In
router.get('/:id', async (req, res) => {
  // Query Database to find all Movies
  let allMovies = await Movie.find({});

  // Query Database to find Drive-In Theater by ID
  let foundDrivein = await Drivein.findById(req.params.id).populate({
    path: 'movies',
    currentUser: req.session.currentUser
   });

  res.render('driveins/show.ejs', {
    drivein: foundDrivein,
    movies: allMovies,
    currentUser: req.session.currentUser
  });
});

// Post Route for Adding New Drivein
router.post('/', isAuthenticated, async (req, res) => {
  console.log(req.body);

  // Create New Drivein Object
  let drivein = new Drivein();
  drivein.name = req.body.name;
  drivein.address = req.body.address;

  // If one movie was returned, change it to an array structure
  if (!Array.isArray(req.body.movies)) {
    let temp = req.body.movies;
    req.body.movies = [];
    req.body.movies.push(temp);
  }

  // This contains the new data that user submitted from POST request
  // This part takes the incoming structure of movies and showtimes
  // The purpose of this section is to build the drivein object with
  // data input by the user.
  req.body.movies.forEach ((movie, index) => {
    Object.keys(req.body).forEach (key => {
      if (movie === key) {
        console.log(index, req.body[key]);

        drivein.movies.push(movie);
        let showtime = {movieshowtimes: []};

        // If more than one movie is updated, an array is returned
        // in the data structure from the POST.
        if (Array.isArray(req.body[key])) {
          for (i=0; i<req.body[key].length; i++) {
            showtime.movieshowtimes.push(req.body[key][i]);
          }
        }
        // If only one movie is updated, a value and not an array is returned.
        else {
          showtime.movieshowtimes.push(req.body[key]);
        }
        drivein.showtimes.push(showtime);
      }
    });
  });

  // This part saves the drivein object to the database for the new drive-in theater
  // which also includes the movie showtimes.
  await drivein.save();
  res.redirect(`/driveins/${drivein.id}`);
});


// PUT Update method for updating the name and address of the drive-in theater.
router.put('/:driveinId/editName', isAuthenticated, (req, res) => {
  console.log('PUT EDIT NAME ROUTE');
  // set the value of the Drivein id
  const driveinId = req.params.driveinId;

  // find drive-in movie in db by id
  Drivein.findById(driveinId, (err, foundDrivein) => {
    foundDrivein.name = req.body.name;
    foundDrivein.address = req.body.address;
    foundDrivein.save((err, savedDrivein) => {
      res.redirect(`/driveins/${foundDrivein.id}`);
    });
  });
});

// PUT EDIT Method for update
router.put('/:driveinId/edit', isAuthenticated, async (req, res) => {
  console.log(req.body);

  // If one movie was returned, change it to an array structure
  if (!Array.isArray(req.body.movies)) {
    let temp = req.body.movies;
    req.body.movies = [];
    req.body.movies.push(temp);
  }

  // Create new drive-in object.
  // The callSucceededFlag was used to determine if DB update was succcessful.
  let drivein = new Drivein();
  let callSucceededFlag = false;

  // Obtain Current Data in DB for Updating it
  let foundDrivein = await Drivein.findById(req.params.driveinId);
  
  console.log(`foundDrivein is ${foundDrivein}`);
  callSucceededFlag = true;

  // Update new drivein object with data from database
  for (let i=0; i<foundDrivein.movies.length; i++) {
        drivein.movies.push(foundDrivein.movies[i]);
        drivein.showtimes.push(foundDrivein.showtimes[i]);
  }

  console.log(`1 drivein movies length is: ${drivein.movies.length}`);
  console.log(`callSucceededFlag is: ${callSucceededFlag}`);

  // This was used to check if DB findById call returned callback
  if (callSucceededFlag) {
    req.body.movies.forEach ((movie, index) => {

      Object.keys(req.body).forEach (key => {
        if (movie === key) {
          console.log(index, req.body[key]);

          // Push each movie into drivein object
          drivein.movies.push(movie);

          // Build emtpy showtime.movieshowtimes object
          let showtime = {movieshowtimes: []};

          // If multiple movies were returned, an array is returned
          // If an array is returned process the array structure.
          if (Array.isArray(req.body[key])) {
            for (i=0; i<req.body[key].length; i++) {
              showtime.movieshowtimes.push(req.body[key][i]);
            } 
          }
          // If only one movie is updated, a value is returned.
          // Push the showtimes into the drivein object.
          else {
            showtime.movieshowtimes.push(req.body[key]);
          }
          drivein.showtimes.push(showtime);
        }
      });
    });

    console.log(`2 drivein movies length is: ${drivein.movies.length}`);

    // This algorithm goes through the drivein object and removes the duplicates
    // The updated movies are pushed after the original movies and showtimes
    // Remove the earlier instances since the later instances have more updated data
    let duplicateFlag = true;
    while (duplicateFlag) {
      duplicateFlag = false;
      for (let i=0; i<drivein.movies.length; i++) {
        for (let j=i; j<drivein.movies.length; j++) {
          if (i != j) {
            if (String(drivein.movies[i]) == String(drivein.movies[j])) {
              drivein.movies.splice(i, 1);
              drivein.showtimes.splice(i, 1);
              duplicateFlag = true;
            }
          }
        }
      }
    }

    console.log(`3 drivein movies length is: ${drivein.movies.length}`);

    // This finds drivein object by ID and replaces movies array.
    // The movies array contains the original data + updates + removed duplicates
    await Drivein.findByIdAndUpdate(
      req.params.driveinId,
      {
        $set: {
          movies: drivein.movies,
        },
      },
      { new: true, upsert: false }
    );

    // This finds drivein object by ID and replaces showtimes array.
    // The showtimes array contains the original data + updates + removed duplicates
    await Drivein.findByIdAndUpdate(
      req.params.driveinId,
      {
        $set: {
          showtimes: drivein.showtimes,
        },
      },
      { new: true, upsert: false }
    );
  }

  res.redirect(`/driveins/${req.params.driveinId}`);
});


// Remove movies under drive-in movie
router.delete('/:driveinId/movies/:movieId', isAuthenticated, (req, res) => {
  console.log('DELETE MOVIE');

  const driveinId = req.params.driveinId;
  const movieId = req.params.movieId;

  // Find Drive-in movie object in DB
  Drivein.findById(driveinId, (err, foundDrivein) => {
    let index = 0;

    // Find the movie (and showtimes) that will be removed from DB
    for (let i=0; i<foundDrivein.movies.length; i++) {
      if (String(foundDrivein.movies[i]) == String(movieId)) {
        index = i;
      }
    }

    // Update the foundDrivein object by removing the deleted movie and showtime
    foundDrivein.movies.splice(index, 1);
    foundDrivein.showtimes.splice(index, 1);

    // Save the updated foundDrivein object back to the DB
    foundDrivein.save((err, savedDrivein) => {
      res.redirect(`/driveins/${foundDrivein.id}`);
    });
  });
});


// DELETE Drive-in movie object.
// NOTE that this does not remove the movie from the database.
router.delete('/:id', isAuthenticated, (req, res) => {
  Drivein.findByIdAndRemove(req.params.id, (err, deletedFruit) => {
    res.redirect('/driveins');
  })
});

module.exports = router;
