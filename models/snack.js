const mongoose = require('mongoose');
const snackSchema = new mongoose.Schema({
  name: {
    type: String,
    default: '',
  }
});
module.exports = mongoose.model('Snack', snackSchema);
