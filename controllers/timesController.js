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

//TIME FORM
router.get('/movie', async (req, res) => {
    console.log('Index ByMovie Route');
    let allMovies = await Movie.find({});
    let allDriveins = await Drivein.find({});
    res.render('times/indexByMovie.ejs', { 
      movies: allMovies ,
      driveins: allDriveins,
      currentUser: req.session.currentUser
    });
});

router.get('/drivein', async (req, res) => {
  console.log('Index ByDrivein Route');
  let allMovies = await Movie.find({});
  let allDriveins = await Drivein.find({});
  res.render('times/indexByDrivein.ejs', { 
    movies: allMovies ,
    driveins: allDriveins,
    currentUser: req.session.currentUser
  });
});

module.exports = router;
