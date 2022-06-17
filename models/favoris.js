const mongoose = require('mongoose');

//------------ Favoris Schema ------------//
const favorisSchema = new mongoose.Schema({
  id_recette: {
    type: String,
    required: true
  },

  id_user: {
    type: String,
    required: true
  }
}, { timestamps: true });


const User = mongoose.model('Favoris', favorisSchema);

module.exports = favoris;