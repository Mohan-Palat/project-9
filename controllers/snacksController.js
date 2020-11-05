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

//SNACK INDEX ROUTE
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

//SNACK NEW ROUTE
router.get('/new', isAuthenticated, (req, res) => {
  res.render('snacks/new.ejs', {
    currentUser: req.session.currentUser
  });
});

// SNACK EDIT ROUTE
router.get('/:snackId/edit', isAuthenticated, (req, res) => {
  // set the value of the Snack ID
  const snackId = req.params.snackId;

  // find Snack in db by Snack ID
  Snack.findById(snackId, (err, foundSnack) => {
    res.render('snacks/edit.ejs', { 
        foundSnack,
        currentUser: req.session.currentUser
    });
  });
});

// SNACK SHOW ROUTE
// Get Show Page for Snack
router.get('/:snackId', (req, res) => {
    Snack.findById(req.params.snackId, (error, snack) => {
        console.log(snack);
        res.render('snacks/show.ejs', { 
            snack,
            currentUser: req.session.currentUser
        });
    });
});

// CREATE A NEW SNACK
router.post('/', isAuthenticated, async (req, res) => {
  console.log(req.body);
    try {
      let newSnack = await Snack.create(req.body);
      res.redirect(`/snacks/${newSnack.id}`);
    } catch (error) {
      res.send(error);
    }
});

// SNACK UPDATE PUT ROUTE
// Update Snack
router.put('/:snackId', isAuthenticated, (req, res) => {
  console.log('PUT ROUTE');
  // set the value of the Snack ID
  const snackId = req.params.snackId;

  // find snack by Snack ID in DB
  Snack.findById(snackId, (err, foundSnack) => {
    foundSnack.name = req.body.name;
    foundSnack.save((err, savedSnack) => {
      res.redirect(`/snacks/${foundSnack.id}`);
    });
  });
});

// DELETE ROUTE
// Delete Snack from DB
router.delete('/:id', isAuthenticated, async (req, res) => {
    let deletedSnack = await Snack.findByIdAndRemove(req.params.id);
    console.log(`deletedSnack is ${deletedSnack}`);

  res.redirect('/snacks');
});

module.exports = router;
