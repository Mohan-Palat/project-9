const mongoose = require('mongoose');

const Drivein = require('./models/drivein');
const Movie = require('./models/movie');

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'project2-db';;
mongoose.connect(
  mongoURI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  },
  () => {
    console.log('the connection with mongod is established');
  }
);

async function seed() {
  await mongoose.connection.dropCollection('movies');
  await mongoose.connection.dropCollection('driveins');

  // CREATE TWO MOVIES
  const irishman = await Movie.create({
    title: 'The Irishman',
    description: 'A movie about a guy who is Irish',
  });

  const parasite = await Movie.create({
    title: 'Parasite',
    description: 'A movie that takes place in South Korea',
  });

  // CREATE A NEW DRIVEINS
  const moonlightDrivein = new Drivein({
    name: 'Moonlight Drive-In',
    movies: [],
    showtimes: [],
  });

  // .create() = .new() + .save()

  // // PUSH THE INGREDIENTS ONTO THE FOOD'S
  // // INGREDIENTS ARRAY
  moonlightDrivein.movies.push(irishman);
  moonlightDrivein.movies.push(parasite); // associated!

  moonlightDrivein.showtimes.push({movieshowtimes: ['7:00', '8:00']});
  moonlightDrivein.showtimes.push({movieshowtimes: ['7:00', '9:00']}); // associated!

  moonlightDrivein.save(function (err, savedmoonlightDrivein) {
    if (err) {
      console.log(err);
    } else {
      console.log('Moonlight Drive-in is ', savedmoonlightDrivein);
    }
  });
}

seed();