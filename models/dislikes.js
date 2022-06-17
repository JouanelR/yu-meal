const mongoose = require('mongoose');

//------------ Likes Schema ------------//
const dislikesSchema = new mongoose.Schema({
  id_recette: {
    type: String,
    required: true
  },

  id_user: {
    type: String,
    required: true
  }
}, { timestamps: true });


const Dislikes = mongoose.model('Dislikes', likesSchema);

module.exports = Dislikes;