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
  let drivein = new Drivein();
  drivein.name = req.body.name;

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
  console.log(drivein);
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

router.delete('/:driveinId/movies/:movieId', (req, res) => {
  console.log('DELETE MOVIE');
  // set the value of the user and tweet ids
  const driveinId = req.params.driveinId;
  const movieId = req.params.movieId;
  // find user in db by id
  Drivein.findById(driveinId, (err, foundDrivein) => {
    // find tweet embedded in user
    let index = 0;

    for (let i=0; i<foundDrivein.movies.length; i++) {
      if (String(foundDrivein.movies[i]) == String(movieId)) {
        index = i;
      }
    }
    console.log(index);

    foundDrivein.movies.splice(index, 1);
    foundDrivein.showtimes.splice(index, 1);
    // update tweet text and completed with data from request body
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
