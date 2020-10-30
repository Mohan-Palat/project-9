const mongoose = require('mongoose');
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
    unique: true,
  },
  description: {
    type: String,
    default: '',
  },
}, 
{timestamps: true}
);

module.exports = mongoose.model('Movie', movieSchema);
