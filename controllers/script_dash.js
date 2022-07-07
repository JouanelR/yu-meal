const myScript = require('../controllers/script_dash.js');


//var ObjectID = require('mongodb').ObjectID


var listedeslikes;
const express = require('express');
const router = express.Router();
var idA = "62bc09302061c35ea0fbbd8b";
var nameA = "r";
var repA = {'Unnamed: 0': 0, 'index': 0, 'name': 'arriba   baked winter squash mexican style', 'id': 137739, 'minutes': 55, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'side-dishes', 'vegetables', 'mexican', 'easy', 'fall', 'holiday-event', 'vegetarian', 'winter', 'dietary', 'christmas', 'seasonal', 'squash']", 'nutrition': '[51.5, 0.0, 13.0, 0.0, 2.0, 0.0, 4.0]', 'ingredients': "['winter squash', 'mexican seasoning', 'mixed spice', 'honey', 'butter', 'olive oil', 'salt']", 'n_ingredients': 7, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/13/77/39/picWfGTtA.jpg'};
var idRecetteA;
var idDeLaRecetteProposee = 124;
//var lrepA = ['crunchy romaine salad with eggs and croutons', 'stuffed celery', 'stuffed artichoke hearts', 'chicken broccoli pizza  low carb', 'potato ham bake'];
/*var lrepA = [
{'Unnamed: 0': 0, 'index': 0, 'name': 'arriba   baked winter squash mexican style', 'id': 137739, 'minutes': 55, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'side-dishes', 'vegetables', 'mexican', 'easy', 'fall', 'holiday-event', 'vegetarian', 'winter', 'dietary', 'christmas', 'seasonal', 'squash']", 'nutrition': '[51.5, 0.0, 13.0, 0.0, 2.0, 0.0, 4.0]', 'steps': "['make a choice and proceed with recipe', 'depending on size of squash , cut into half or fourths', 'remove seeds', 'for spicy squash , drizzle olive oil or melted butter over each cut squash piece', 'season with mexican seasoning mix ii', 'for sweet squash , drizzle melted honey , butter , grated piloncillo over each cut squash piece', 'season with sweet mexican spice mix', 'bake at 350 degrees , again depending on size , for 40 minutes up to an hour , until a fork can easily pierce the skin', 'be careful not to burn the squash especially if you opt to use sugar or butter', 'if you feel more comfortable , cover the squash with aluminum foil the first half hour , give or take , of baking', 'if desired , season with salt']", 'ingredients': "['winter squash', 'mexican seasoning', 'mixed spice', 'honey', 'butter', 'olive oil', 'salt']", 'n_ingredients': 7, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/13/77/39/picWfGTtA.jpg'}, 
{'Unnamed: 0': 18469, 'index': 18469, 'name': 'chicken breasts lombardi', 'id': 49, 'minutes': 75, 'tags': "['weeknight', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'very-low-carbs', 'main-dish', 'poultry', 'oven', 'european', 'dinner-party', 'italian', 'chicken', 'dietary', 'low-carb', 'low-in-something', 'meat', 'chicken-breasts', 'equipment', '4-hours-or-less']", 'nutrition': '[627.7, 38.0, 8.0, 35.0, 115.0, 64.0, 4.0]', 'steps': '[\'cook mushrooms in 2 tbsp butter in a large skillet , stirring constantly , just until tender\', \'remove from heat\', \'set aside\', \'cut each chicken breast half in half lengthwise\', \'place each piece of chicken between two sheets of wax paper\', \'flatten to 1 / 8" thickness , using a meat mallet or rolling pin\', \'dredge chicken pieces in flour\', \'place 5 or 6 pieces of chicken in 1 to 2 tbsp butter in a large skillet\', \'cook over medium heat 3 to 4 minutes on each side or until golden\', \'place chicken in a lightly greased 13x9" baking dish , overlapping edges\', \'repeat procedure with remaining chicken and butter\', \'reserve pan drippings in skillet\', \'sprinkle reserved mushrooms over chicken\', \'add wine and broth to skillet\', \'bring to a boil\', \'reduce heat , and simmer , uncovered , 10 minutes , stirring occasionally\', \'stir in salt and pepper\', \'pour sauce over chicken\', \'combine cheeses and green onions\', \'sprinkle over chicken\', \'bake uncovered at 450 for 12 to 14 minutes\', \'broil 5 1 / 2" away from heat 1 to 2 minutes or until browned\']', 'ingredients': "['fresh mushrooms', 'butter', 'boneless skinless chicken breast halves', 'flour', 'marsala', 'chicken broth', 'salt', 'mozzarella cheese', 'parmesan cheese', 'green onion']", 'n_ingredients': 10, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/49/m1z1F8S5mAZgyImm5zYw_Lombardi%20Chicken%203.jpg'}, 
]*/
var lrepA = [ ];
var dejarecommende = -1;


function sendDataCallback() {
    if (xhr.readyState == 4 && xhr.status == 201) {
        console.log("Creation data received :");
        dd = xhr.responseText
        console.log("received:",dd);
        var data = JSON.parse(dd);
        data.forEach(function(item, index, array) {
            lrepA.push(item);
        });
        console.log("longueur :"+lrepA.length);
    }
}



exports.getDashboard = (req, res) => {
    
    xhr = null;
    
    var dataToSend = { userid :idA};
    if (!dataToSend) {
        console.log("Data is empty.");            
    }
    console.log("Sending data: " + dataToSend);
    if (!xhr) {
        // Create a new XMLHttpRequest object 
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        xhr = new XMLHttpRequest();
    }
    xhr.onreadystatechange = sendDataCallback;
    
    // asynchronous requests
    xhr.open("POST", "http://localhost:6969/dashboard", true);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Send the request over the network
    xhr.send(JSON.stringify({"data": dataToSend}));
}


exports.recommendationHandle = (req, res) => {
    myScript.getDashboard();
    var dmc_setInterval = setInterval(test,8000);
    var okk = 0;
    function test () {
        clearTimeout(dmc_setInterval);
        //lrepA = 
    }
    
}

//------------ User Model ------------//
const Like = require('../models/likes');

exports.likeHandle = (req, res) => {
    const { id2,idRecette } = req.body;
    const newLike = new Like({
        id_user :id2,
        id_recette : idRecette
    });
    
    newLike.save()
    console.log("like");
    dejarecommende++;
    myScript.nextRepA();
    res.render('dash',{
        id : idA, name : nameA,  utils: myScript, donne: repA, idDeLaRecetteProposee : idDeLaRecetteProposee
    });
}


//------------ User Model ------------//
const Dislike = require('../models/dislikes');
exports.dislikeHandle = (req, res) => {
    const { name,id2,idRecette } = req.body;
    idA = id2;
    idRecetteA = idRecette["id"];
    nameA = name;
    const newDislike = new Dislike({
        id_user :id2,
        id_recette : idRecette
    });
    
    newDislike.save()
    console.log("dislike");
    dejarecommende++;
    myScript.nextRepA();
    res.render('dash',{
        id : idA, name : nameA,  utils: myScript, donne: repA, idDeLaRecetteProposee : idDeLaRecetteProposee
    });
}


var init = 0;
exports.nextRepA = (req, res) => {
    if(dejarecommende == 0  && init == 0){
        init = 1;
        myScript.RecupRecommendation();
        console.log("first recommendation");
    }
    else if(dejarecommende % 7 == 0 && init == 1){
        myScript.recommendationHandle();
        console.log("recommendation");
    }
    repA = lrepA[dejarecommende];
    //console.log(repA);
    console.log(lrepA.length,dejarecommende);
    idDeLaRecetteProposee = repA["id"];
    console.log("Ingredients",typeof repA["ingredients"],repA["ingredients"])
    repA["ingredients"] = decompress(repA["ingredients"])
    repA["steps"] = decompress(repA["steps"])
    
}


function decompress(chstr){
    var result = chstr.split(",")
    for (i in result){
        result[i] = result[i].replace('[', '');
        result[i] = result[i].replace(']', '');
        result[i] = result[i].replace("'", '');
        result[i] = result[i].replace("'", '');
        result[i] = result[i].replace(" ", '');
    }
    return result;
}






const User = require('../models/User');



function tryConfirm(id,vege,vegan,gf) {
    console.log("confirm");
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";
    console.log("confirm id : " + id_confirm);

    MongoClient.connect(url, function(err, db, vegan, vege, gf, id) {
        if (err) throw err;
        var dbo = db.db("test");
        var myquery = { _id: id};
        var newvalues = { $set: {vegan: vegan, gluten_free: gf, vegetarien: vege } };
        
        dbo.collection("customers").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
        });
    });
}

exports.RecupLike = (req, res) => {
    console.log("RecupLike");
    xhr = null;
    iddd = req.user.id;
    var dataToSend = { userid : iddd };
    if (!dataToSend) {
        console.log("Data is empty.");            
    }
    console.log("Sending data: " + dataToSend);
    if (!xhr) {
        // Create a new XMLHttpRequest object 
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        xhr = new XMLHttpRequest();
    }
    //xhr.onreadystatechange = sendDataLikeCallback;
    
    xhr.open("POST", "http://localhost:6969/favoris", false);//synchronous
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Send the request over the network
    xhr.send(JSON.stringify({"data": dataToSend}));
    listedeslikes = xhr.responseText;
    listedeslikes = JSON.parse(listedeslikes);
    console.log("received:",listedeslikes.length);
    res.render('favoris', {
        listedeslikes : listedeslikes, utils : myScript
    });
}



function returnListeLike(){
    return listedeslikes;
}
function parseBool(val) { return val === true || val === "true" }


exports.confirmHandle = (req,res) => {
    console.log("confirm");
    

    

    var { vega2,vege2,glut2,meat2,egg2,lct2,pnuts2,sea2,meat2 } = req.body;
    console.log(vega2,vege2,glut2,meat2,egg2,lct2,pnuts2,sea2);

    var vega2 = parseBool(vega2);
    var vege2 = parseBool(vege2);
    var glut2 = parseBool(glut2);
    var meat2 = parseBool(meat2);
    var egg2 = parseBool(egg2);
    var lct2 = parseBool(lct2);
    var pnuts2 = parseBool(pnuts2);
    var sea2 = parseBool(sea2);
    var meat2 = parseBool(meat2);



    var mongoose = require('mongoose');
    var id_confirm = mongoose.Types.ObjectId(req.user.id);
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";



    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myquery = { _id: id_confirm };
    var newvalues = { $set: {vegan: vega2, vegetarien: vege2, gluten_free : glut2, egg: egg2, lactose: lct2, peanuts: pnuts2, seafood:sea2, meat:meat2 } };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
    });


   
    res.render('profile', {
        name: req.user.name, id : req.user.id, vegan :req.user.vegan, vegetarien : req.user.vegetarien, gluten_free : req.user.gluten_free, lactose : req.user.lactose, nuts : req.user.nuts, peanuts : req.user.peanuts, seafood : req.user.seafood,egg: req.user.egg, meat: req.user.meat, utils : myScript
    });
}

exports.RecupRecommendation = (req, res) => {
    xhr = null;
    
    var dataToSend = { userid :idA};
    if (!dataToSend) {
        console.log("Data is empty.");            
    }
    console.log("Sending data first: " + dataToSend);
    if (!xhr) {
        // Create a new XMLHttpRequest object 
        var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
        xhr = new XMLHttpRequest();
    }
    
    // asynchronous requests
    xhr.open("POST", "http://localhost:6969/dashboard", false);
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    // Send the request over the network
    xhr.send(JSON.stringify({"data": dataToSend}));

    dd = xhr.responseText
    console.log("received:",dd);
    var data = JSON.parse(dd);
    data.forEach(function(item, index, array) {
        lrepA.push(item);
    });
    console.log("longueur :"+lrepA.length);
}


