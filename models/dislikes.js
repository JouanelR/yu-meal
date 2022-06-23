process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


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


const Dislikes = mongoose.model('dislikes', likesSchema);

module.exports = Dislikes;