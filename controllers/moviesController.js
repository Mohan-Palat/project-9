const router = require('express').Router();
const Drivein = require('../models/drivein');
const Movie = require('../models/movie.js');

//NEW MOVIE FORM
router.get('/', async (req, res) => {
    console.log('Index Route');
    let allMovies = await Movie.find({});
    let allDriveins = await Drivein.find({});
    res.render('movies/index.ejs', { 
      movies: allMovies ,
      driveins: allDriveins
    });
});

router.get('/new', (req, res) => {
  res.render('movies/new.ejs');
});

router.get('/:movieId', (req, res) => {
  Movie.findById(req.params.movieId, (error, movie) => {
    res.render('movies/show.ejs', { movie });
  });
});

// CREATE A NEW MOVIE
router.post('/', async (req, res) => {
    try {
      let newMovie = await Movie.create(req.body);
      res.redirect(`/movies/${newMovie.id}`);
      // res.send(newMovie);
    } catch (error) {
      res.send(error);
    }
});

// DELETE
router.delete('/:id', async (req, res) => {
  Movie.findByIdAndRemove(req.params.id, async (err, deletedMovie) => {
    let allDriveins = await Drivein.find({});
    allDriveins.forEach(async(driveinKey, moviesIndex) => {

      driveinKey.movies.forEach((movieKey, movieIndex) => {
        console.log(`movieKey is ${movieKey}`);
        if (String(movieKey) != String(deletedMovie._id)) {
          drivein.movies.push(movieKey);
          drivein.showtimes.push(driveinKey.showtimes[movieIndex]);
        }
      });

      await Drivein.findByIdAndUpdate(
        driveinKey._id,
        {movies: drivein.movies},
        { new: true, upsert: false }
      );
      await Drivein.findByIdAndUpdate(
        driveinKey._id,
        {showtimes: drivein.showtimes},
        { new: true, upsert: false }
      );
    });

    res.redirect('/movies');
  });
});

module.exports = router;
