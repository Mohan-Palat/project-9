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

router.get('/new', isAuthenticated, (req, res) => {
  res.render('movies/new.ejs', {
    currentUser: req.session.currentUser
  });
});

router.get('/:movieId/edit', isAuthenticated, (req, res) => {
  // set the value of the user and tweet ids
  const driveinId = req.params.driveinId;
  const movieId = req.params.movieId;
  // find user in db by id
  Movie.findById(movieId, (err, foundMovie) => {
    res.render('movies/edit.ejs', { 
      foundMovie,
      currentUser: req.session.currentUser
    });
  });
});

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
      let newMovie = await Movie.create(req.body);
      res.redirect(`/movies/${newMovie.id}`);
      // res.send(newMovie);
    } catch (error) {
      res.send(error);
    }
});

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

// DELETE
router.delete('/:id', isAuthenticated, async (req, res) => {
  // Movie.findByIdAndRemove(req.params.id, async (err, deletedMovie) => {
  //   let allDriveins = await Drivein.find({});
  //   allDriveins.forEach(async(driveinKey, moviesIndex) => {

  //     driveinKey.movies.forEach((movieKey, movieIndex) => {
  //       console.log(`movieKey is ${movieKey}`);
  //       if (String(movieKey) != String(deletedMovie._id)) {
  //         drivein.movies.push(movieKey);
  //         drivein.showtimes.push(driveinKey.showtimes[movieIndex]);
  //       }
  //     });

    let deletedMovie = await Movie.findByIdAndRemove(req.params.id);
    console.log(`deletedMovie is ${deletedMovie}`);
    let allDriveins = await Drivein.find({});

    allDriveins.forEach( async (drivein, moviesIndex) => {
      console.log(`drivein is ${drivein}`);
      
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

      await Drivein.findByIdAndUpdate(
        drivein._id,
        {
          $set: {
            movies: tempMovies,
          },
        },
        { new: true, upsert: false }
      );

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
