process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth');
//const { getDashboard } = require('../config/dash');
//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('welcome');
});

const myScript = require('../controllers/script_dash.js');
router.get('/dashboard',ensureAuthenticated,  (req, res) => res.render('dash',{
    id : req.user.id, name : req.user.name, mail : req.user.mail, utils: myScript, donne : null
}));
     
//router.get('/tinder',  (req, res) => res.render('tinder',{
  //  id : req.user.id, name : req.user.name, mail : req.user.mail
//}));
//getDashboard,


//------------ Register POST Handle ------------//
router.post('/dashboard',ensureAuthenticated, myScript.dislikeHandle);

module.exports = router;



//const myScript = require('../controllers/script_dash.js');
/*const myScript = require('../config/dash');

router.get('/dashboard',ensureAuthenticated,  (req, res) => res.render('dash',{
    id : req.user.id, name : req.user.name, utils: myScript
}));


router.post('/dashboard', myScript.test);*/

