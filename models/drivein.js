const mongoose = require('mongoose');
const driveinSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  },
  address: {
    type: String,
    default: '',
  },
  movies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Movie',
    },
  ],
  showtimes: [
    {
      movieshowtimes: [
        {
          type: String,
          default: '',
        },
      ],
    },
  ],
});
module.exports = mongoose.model('Drivein', driveinSchema);
