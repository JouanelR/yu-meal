const mongoose = require('mongoose');

//------------ User Schema ------------//
const UserSchema = new mongoose.Schema({
  
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  verified: {
    type: Boolean,
    default: false
  },
  resetLink: {
    type: String,
    default: ''
  },

  vegan: {
    type: Boolean,
    default: false
  },

  gluten_free: {
    type: Boolean,
    default: false
  },

  vegetarien: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });


const User = mongoose.model('Users', UserSchema);

module.exports = User;