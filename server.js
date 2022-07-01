process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0;
var requirejs = require('requirejs');

requirejs.config({
   //load the mode modules to top level JS file 
   //by passing the top level main.js require function to requirejs
   nodeRequire: require
});

const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

//------------ Passport Configuration ------------//
require('./config/passport')(passport);

//------------ DB Configuration ------------//


const db = require('./config/key').MongoURI;

//const dotenv = require('dotenv');
//dotenv.config()


//------------ Mongo Connection ------------//

mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => console.log("Successfully connected to MongoDB"))
    .catch(err => console.log(err));

//------------- Connexion server ------------//



//------------ EJS Configuration ------------//
app.use(expressLayouts);
app.use("/assets", express.static('./assets'));
app.set('view engine', 'ejs');

//------------ Bodyparser Configuration ------------//
app.use(express.urlencoded({ extended: false }))

//------------ Express session Configuration ------------//
app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);

//------------ Passport Middlewares ------------//
app.use(passport.initialize());
app.use(passport.session());

//------------ Connecting flash ------------//
app.use(flash());

//------------ Global variables ------------//
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
//------------ Routes ------------//
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/index'));
app.use('/profile',require('./routes/index'));


app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
});


//------------ Server Configuration ------------//
const PORT = process.env.PORT || 3006;
app.listen(PORT, console.log(`Server running on PORT ${PORT}`));



