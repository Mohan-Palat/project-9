const router = require('express').Router();
const Drivein = require('../models/drivein');
const Movie = require('../models/movie');

router.get('/', async (req, res) => {
  console.log('Index Route');
  let allDriveins = await Drivein.find({});
  res.render('driveins/index.ejs', { driveins: allDriveins });
});

router.get('/new', async (req, res) => {
  let allMovies = await Movie.find({});
  res.render('driveins/new.ejs', { movies: allMovies });
});


router.get('/:driveinId/edit', (req, res) => {
  // set the value of the user and tweet ids
  const driveinId = req.params.driveinId;
  // find user in db by id
  Drivein.findById(driveinId, (err, foundDrivein) => {
    res.render('driveins/edit.ejs', { foundDrivein });
  });
});


router.get('/:id', async (req, res) => {
  let allMovies = await Movie.find({});
  let foundDrivein = await Drivein.findById(req.params.id).populate({
    path: 'movies',
   });

  res.render('driveins/show.ejs', {
    drivein: foundDrivein,
    movies: allMovies,
  });
});


router.post('/', async (req, res) => {
  console.log(req.body);
  let drivein = new Drivein();
  drivein.name = req.body.name;

  if (!Array.isArray(req.body.movies)) {
    let temp = req.body.movies;
    req.body.movies = [];
    req.body.movies.push(temp);
  }

  req.body.movies.forEach ((movie, index) => {
    Object.keys(req.body).forEach (key => {
      if (movie === key) {
        console.log(index, req.body[key]);
        drivein.movies.push(movie);
        let showtime = {movieshowtimes: []};
        if (Array.isArray(req.body[key])) {
          for (i=0; i<req.body[key].length; i++) {
            showtime.movieshowtimes.push(req.body[key][i]);
          }
        }
        else {
          showtime.movieshowtimes.push(req.body[key]);
        }
        drivein.showtimes.push(showtime);
      }
    });
  });

  await drivein.save();
  res.redirect(`/driveins/${drivein.id}`);
});


router.put('/:driveinId/editName', (req, res) => {
  console.log('PUT ROUTE');
  // set the value of the song id
  const driveinId = req.params.driveinId;
  // find movie in db by id
  Drivein.findById(driveinId, (err, foundDrivein) => {
    foundDrivein.name = req.body.name;
    foundDrivein.save((err, savedDrivein) => {
      res.redirect(`/driveins/${foundDrivein.id}`);
    });
  });
});


router.put('/:driveinId/edit', async (req, res) => {
  console.log(req.body);

  if (!Array.isArray(req.body.movies)) {
    let temp = req.body.movies;
    req.body.movies = [];
    req.body.movies.push(temp);
  }

  let drivein = new Drivein();

  await Drivein.findById(req.params.driveinId, async (err, foundDrivein) => {
    for (let i=0; i<foundDrivein.movies.length; i++) {
      drivein.movies.push(foundDrivein.movies[i]);
      drivein.showtimes.push(foundDrivein.showtimes[i]);
    }
  });

  req.body.movies.forEach ((movie, index) => {

    Object.keys(req.body).forEach (key => {
      if (movie === key) {
        console.log(index, req.body[key]);
        drivein.movies.push(movie);
        let showtime = {movieshowtimes: []};
        if (Array.isArray(req.body[key])) {
          for (i=0; i<req.body[key].length; i++) {
            showtime.movieshowtimes.push(req.body[key][i]);
          }
        }
        else {
          showtime.movieshowtimes.push(req.body[key]);
        }
        drivein.showtimes.push(showtime);
      }
    });
  });

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

  await Drivein.findByIdAndUpdate(
    req.params.driveinId,
    {
      $set: {
        movies: drivein.movies,
      },
    },
    { new: true, upsert: false }
  );

  await Drivein.findByIdAndUpdate(
    req.params.driveinId,
    {
      $set: {
        showtimes: drivein.showtimes,
      },
    },
    { new: true, upsert: false }
  );

  res.redirect(`/driveins/${req.params.driveinId}`);
});


router.delete('/:driveinId/movies/:movieId', (req, res) => {
  console.log('DELETE MOVIE');

  const driveinId = req.params.driveinId;
  const movieId = req.params.movieId;

  Drivein.findById(driveinId, (err, foundDrivein) => {
    let index = 0;

    for (let i=0; i<foundDrivein.movies.length; i++) {
      if (String(foundDrivein.movies[i]) == String(movieId)) {
        index = i;
      }
    }

    foundDrivein.movies.splice(index, 1);
    foundDrivein.showtimes.splice(index, 1);

    foundDrivein.save((err, savedDrivein) => {
      res.redirect(`/driveins/${foundDrivein.id}`);
    });
  });
});


// DELETE
router.delete('/:id', (req, res) => {
  Drivein.findByIdAndRemove(req.params.id, (err, deletedFruit) => {
    res.redirect('/driveins');
  })
});

module.exports = router;
