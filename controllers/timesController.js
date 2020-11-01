const router = require('express').Router();
const Drivein = require('../models/drivein');
const Movie = require('../models/movie.js');

//TIME FORM
router.get('/', async (req, res) => {
    console.log('Index Route');
    let allMovies = await Movie.find({});
    let allDriveins = await Drivein.find({});
    res.render('times/index.ejs', { 
      movies: allMovies ,
      driveins: allDriveins
    });
});

module.exports = router;
