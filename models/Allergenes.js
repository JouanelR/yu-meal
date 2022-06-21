const mongoose = require('mongoose');

//------------ Likes Schema ------------//
const allergenesSchema = new mongoose.Schema({
  id_recette: {
    type: String,
    required: true
  },

  id_user: {
    type: String,
    required: true
  }
}, { timestamps: true });


const Allergenes = mongoose.model('allergenes', likesSchema);

module.exports = Allergenes;