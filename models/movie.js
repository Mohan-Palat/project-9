const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    default: '',
  },
  description: {
    type: String,
    default: '',
  },
}, 
{timestamps: true}
);

module.exports = mongoose.model('Movie', movieSchema);
