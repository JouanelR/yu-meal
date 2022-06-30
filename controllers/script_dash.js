const myScript = require('../controllers/script_dash.js');

const express = require('express');
const router = express.Router();
var idA = "62bc09302061c35ea0fbbd8b";
var nameA = "r";
var repA = null;
var idRecetteA;
var lrepA = ['crunchy romaine salad with eggs and croutons', 
'stuffed celery', 'stuffed artichoke hearts', 
'chicken broccoli pizza  low carb', 
'potato ham bake'];
var dejarecommende = 0;


function sendDataCallback() {
    if (xhr.readyState == 4 && xhr.status == 201) {
        console.log("Creation data received :");
        dd = xhr.responseText
        JSON.parse(dd, (key, value) => {
            if (key == "message") {
                lrepA = value;
                console.log(lrepA);
            }
        });
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
        id : idA, name : nameA,  utils: myScript, donne: repA,
    });
}


//------------ User Model ------------//
const Dislike = require('../models/dislikes');
exports.dislikeHandle = (req, res) => {
    const { name,id2,idRecette } = req.body;
    idA = id2;
    idRecetteA = idRecette;
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
        id : idA, name : nameA,  utils: myScript, donne: repA,
    });
}



exports.nextRepA = (req, res) => {
    if(dejarecommende == 7){
        myScript.recommendationHandle();
        dejarecommende = 0;
    }
    repA = lrepA[dejarecommende];
}