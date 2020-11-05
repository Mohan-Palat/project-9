const router = require('express').Router();
const Drivein = require('../models/drivein');
const Snack = require('../models/snack.js');

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
    let allDriveins = await Drivein.find({});
    let allSnacks = await Snack.find({});
    res.render('snacks/index.ejs', { 
      driveins: allDriveins,
      snacks: allSnacks,
      currentUser: req.session.currentUser
    });
});

router.get('/new', isAuthenticated, (req, res) => {
  res.render('snacks/new.ejs', {
    currentUser: req.session.currentUser
  });
});

router.get('/:snackId/edit', isAuthenticated, (req, res) => {
  // set the value of the user and tweet ids
  const snackId = req.params.snackId;
  // find user in db by id
  Snack.findById(snackId, (err, foundSnack) => {
    res.render('snacks/edit.ejs', { 
        foundSnack,
        currentUser: req.session.currentUser
    });
  });
});

router.get('/:snackId', (req, res) => {
    Snack.findById(req.params.snackId, (error, snack) => {
        console.log(snack);
        res.render('snacks/show.ejs', { 
            snack,
            currentUser: req.session.currentUser
        });
    });
});

// CREATE A NEW MOVIE
router.post('/', isAuthenticated, async (req, res) => {
  console.log(req.body);
    try {
      let newSnack = await Snack.create(req.body);
      res.redirect(`/snacks/${newSnack.id}`);
    } catch (error) {
      res.send(error);
    }
});

router.put('/:snackId', isAuthenticated, (req, res) => {
  console.log('PUT ROUTE');
  // set the value of the song id
  const snackId = req.params.snackId;
  // find movie in db by id
  Snack.findById(snackId, (err, foundSnack) => {
    foundSnack.name = req.body.name;
    foundSnack.save((err, savedSnack) => {
      res.redirect(`/snacks/${foundSnack.id}`);
    });
  });
});

// DELETE
router.delete('/:id', isAuthenticated, async (req, res) => {
    let deletedSnack = await Snack.findByIdAndRemove(req.params.id);
    console.log(`deletedSnack is ${deletedSnack}`);

//     let allDriveins = await Drivein.find({});

//     allDriveins.forEach( async (drivein, moviesIndex) => {
//       console.log(`drivein is ${drivein}`);
      
//       let tempMovies = [];
//       let tempShowtimes = [];
//       drivein.movies.forEach((movie, index) => {
//         console.log(`movie is ${movie}`);
//         if (String(movie) != String(deletedMovie._id)) {
//           tempMovies.push(movie);
//           console.log(`movie to keep is ${movie}`);
//           tempShowtimes.push(drivein.showtimes[index]);
//           console.log(`showtime to keep is ${drivein.showtimes[index]}`);
//         }
//       });

//       console.log(`tempMovies to keep is ${tempMovies}`);
//       console.log(`tempShowtimes to keep is ${tempShowtimes}`);

//       await Drivein.findByIdAndUpdate(
//         drivein._id,
//         {
//           $set: {
//             movies: tempMovies,
//           },
//         },
//         { new: true, upsert: false }
//       );

//       await Drivein.findByIdAndUpdate(
//         drivein._id,
//         {
//           $set: {
//             showtimes: tempShowtimes,
//           },
//         },
//         { new: true, upsert: false }
//       );
//   });

  res.redirect('/snacks');
});

module.exports = router;
