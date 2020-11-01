const router = require('express').Router();
const Drivein = require('../models/drivein');
const Movie = require('../models/movie.js');

//TIME FORM
router.get('/movie', async (req, res) => {
    console.log('Index ByMovie Route');
    let allMovies = await Movie.find({});
    let allDriveins = await Drivein.find({});
    res.render('times/indexByMovie.ejs', { 
      movies: allMovies ,
      driveins: allDriveins
    });
});

router.get('/drivein', async (req, res) => {
  console.log('Index ByDrivein Route');
  let allMovies = await Movie.find({});
  let allDriveins = await Drivein.find({});
  res.render('times/indexByDrivein.ejs', { 
    movies: allMovies ,
    driveins: allDriveins
  });
});

module.exports = router;
