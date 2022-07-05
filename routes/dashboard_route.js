process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth')
//const { getDashboard } = require('../config/checkAuth')

//------------ Dashboard Route ------------//
const myScript = require('../controllers/script_dash.js');
router.get('/dashboard',  (req, res) => res.render('dash',{
    id : req.user.id, name : req.user.name, mail : req.user.mail, utils: myScript
}));
     
//router.get('/tinder',  (req, res) => res.render('tinder',{
  //  id : req.user.id, name : req.user.name, mail : req.user.mail
//}));
//getDashboard,


//------------ Register POST Handle ------------//
router.post('/dashboard', (req, res) => res.render('dash',{
  id : req.user.id, name : req.user.name, mail : req.user.mail, utils: myScript
}));
module.exports = router;





