process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


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


const Favoris = mongoose.model('favoris', favorisSchema);

module.exports = Favoris;