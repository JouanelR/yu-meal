const mongoose = require('mongoose');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


//------------ Admin Schema ------------//
const AdminSchema = new mongoose.Schema({
  
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
  }
}, { timestamps: true });


const Admin = mongoose.model('admin', AdminSchema);

module.exports = Admin;