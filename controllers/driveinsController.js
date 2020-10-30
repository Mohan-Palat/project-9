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

router.get('/:id', async (req, res) => {
  let allMovies = await Movie.find({});
  let foundDrivein = await Drivein.findById(req.params.id).populate({
    path: 'movies',
    options: { sort: { ['name']: 1 } },
  });
  res.render('driveins/show.ejs', {
    drivein: foundDrivein,
    movies: allMovies,
  });
});

router.post('/', async (req, res) => {
  console.log(req.body);
  let drivein = await Drivein.create(req.body);
  res.redirect(`/driveins/${drivein.id}`);
});

router.put('/:driveinId/movies', async (req, res) => {
  let foundDrivein = await Drivein.findByIdAndUpdate(
    req.params.driveinId,
    {
      $push: {
        movies: req.body.movies,
      },
    },
    { new: true, upsert: true }
  );
  console.log(foundDrivein);
  res.redirect(`/drivein/${foundDrivein.id}`);
});

module.exports = router;
