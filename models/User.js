const mongoose = require('mongoose');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


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


const User = mongoose.model('users', UserSchema);

module.exports = User;