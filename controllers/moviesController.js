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

router.get('/:movieId', (req, res) => {
  Movie.findById(req.params.movieId, (error, movie) => {
    res.render('movies/show.ejs', { movie });
  });
});

router.get('/new', (req, res) => {
    res.render('movies/new.ejs');
});

// CREATE A NEW MOVIE
router.post('/', async (req, res) => {
    try {
      let newMovie = await Movie.create(req.body);
      res.send(newMovie);
    } catch (error) {
      res.send(error);
    }
  });

module.exports = router;
