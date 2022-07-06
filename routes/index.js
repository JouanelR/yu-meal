process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;


const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/checkAuth');
const { RecupLike } = require('../controllers/script_dash');
//const { getDashboard } = require('../config/dash');
//------------ Welcome Route ------------//
router.get('/', (req, res) => {
    res.render('welcome');
});

const myScript = require('../controllers/script_dash.js');
router.get('/dashboard',ensureAuthenticated,  (req, res) => res.render('dash',{
    id : req.user.id, name : req.user.name, mail : req.user.mail, utils: myScript, donne : null, idDeLaRecetteProposee : myScript.idDeLaRecetteProposee
}));
     
//router.get('/tinder',  (req, res) => res.render('tinder',{
  //  id : req.user.id, name : req.user.name, mail : req.user.mail
//}));
//getDashboard,


//------------ Register POST Handle ------------//
router.post('/dashboard/dislike',ensureAuthenticated, myScript.dislikeHandle);
router.post('/dashboard/like',ensureAuthenticated, myScript.likeHandle);
//router.post('/dashboard',ensureAuthenticated, myScript.dislikeHandle);

module.exports = router;


//------------ profile route ------------//

router.get('/profile');
router.get('/profile', ensureAuthenticated, (req, res) => res.render('profile', {
   name: req.user.name, id : req.user.id, vegan :req.user.vegan, vegetarien : req.user.vegetarien, gluten_free : req.user.gluten_free, egg : req.user.soy, soy : req.user.soy, lactose : req.user.lactose, nuts : req.user.nuts, peanuts : req.user.peanuts, seafood : req.user.seafood, sesame : req.user.sesame
}));





router.get('/favoris', RecupLike);


async function likkeListAction(req, res) {
    myScript.RecupLike();
}
