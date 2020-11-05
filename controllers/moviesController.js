const router = require('express').Router();
const Drivein = require('../models/drivein');
const Movie = require('../models/movie.js');

const isAuthenticated = (req, res, next) => {
  if (req.session.currentUser) {
    return next()
  } else {
    res.redirect('/sessions/new')
  }
}

//NEW MOVIE FORM
// This is only authorized if user has authorization.
router.get('/', async (req, res) => {
    console.log('Index Route');
    let allMovies = await Movie.find({});
    let allDriveins = await Drivein.find({});
    res.render('movies/index.ejs', { 
      movies: allMovies ,
      driveins: allDriveins,
      currentUser: req.session.currentUser
    });
});

// Get New Movie form.  This is only authorized if user is authenticated.
router.get('/new', isAuthenticated, (req, res) => {
  res.render('movies/new.ejs', {
    currentUser: req.session.currentUser
  });
});

// Movie Edit Route
router.get('/:movieId/edit', isAuthenticated, (req, res) => {
  // set the value of the drive-in and movie IDs
  const driveinId = req.params.driveinId;
  const movieId = req.params.movieId;

  // find movie in db by id
  Movie.findById(movieId, (err, foundMovie) => {
    res.render('movies/edit.ejs', { 
      foundMovie,
      currentUser: req.session.currentUser
    });
  });
});

// MOVIE SHOW ROUTE
// Get movie show view by movie ID if user is authorized
router.get('/:movieId', (req, res) => {
  Movie.findById(req.params.movieId, (error, movie) => {
    res.render('movies/show.ejs', { 
      movie,
      currentUser: req.session.currentUser
    });
  });
});

// CREATE A NEW MOVIE
router.post('/', isAuthenticated, async (req, res) => {
  console.log(req.body);
  try {
      // Create new movie in database
      let newMovie = await Movie.create(req.body);
      res.redirect(`/movies/${newMovie.id}`);
    } catch (error) {
      res.send(error);
    }
});


// MOVIE PUT Route for update of movie
// Movie 
router.put('/:movieId', isAuthenticated, (req, res) => {
  console.log('PUT ROUTE');
  // set the value of the song id
  const movieId = req.params.movieId;

  // find movie in db by id
  Movie.findById(movieId, (err, foundMovie) => {
    foundMovie.title = req.body.title;
    foundMovie.description = req.body.description;
    foundMovie.save((err, savedMovie) => {
      res.redirect(`/movies/${foundMovie.id}`);
    });
  });
});

// DELETE MOVIE Route
// Delete movie from database
// Delete movie from each drive-in theater that has a reference to that movie
router.delete('/:id', isAuthenticated, async (req, res) => {
    // Delete movie from database
    let deletedMovie = await Movie.findByIdAndRemove(req.params.id);
    console.log(`deletedMovie is ${deletedMovie}`);

    // Find all driveins in the database
    // For each drivein, the movies and showtimes arrays will be populated.
    // The deleted movie will be removed from the movies and showtimes array
    // The arrays would then replace the arrays in the database.
    let allDriveins = await Drivein.find({});
    allDriveins.forEach( async (drivein, moviesIndex) => {
      console.log(`drivein is ${drivein}`);
      
      // Build empty arrays for both temp movies and temp showtimes
      // For each movie build the movies and showtimes arrays with the movies to NOT delete
      let tempMovies = [];
      let tempShowtimes = [];
      drivein.movies.forEach((movie, index) => {
        console.log(`movie is ${movie}`);
        if (String(movie) != String(deletedMovie._id)) {
          tempMovies.push(movie);
          console.log(`movie to keep is ${movie}`);
          tempShowtimes.push(drivein.showtimes[index]);
          console.log(`showtime to keep is ${drivein.showtimes[index]}`);
        }
      });

      console.log(`tempMovies to keep is ${tempMovies}`);
      console.log(`tempShowtimes to keep is ${tempShowtimes}`);

      // Update the movies array on the drivein object with the updated array (removed movie)
      await Drivein.findByIdAndUpdate(
        drivein._id,
        {
          $set: {
            movies: tempMovies,
          },
        },
        { new: true, upsert: false }
      );

      // Update the showtimes array on the drivein object with the updated array (removed showtimes)
      await Drivein.findByIdAndUpdate(
        drivein._id,
        {
          $set: {
            showtimes: tempShowtimes,
          },
        },
        { new: true, upsert: false }
      );
  });

  res.redirect('/movies');
});

module.exports = router;
