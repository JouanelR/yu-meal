
const mongoose = require('mongoose');

//------------ Likes Schema ------------//
const likesSchema = new mongoose.Schema({
  id_recette: {
    type: String,
    required: true
  },

  id_user: {
    type: String,
    required: true
  }
}, { timestamps: true });


const Likes = mongoose.model('likes', likesSchema);

module.exports = Likes;