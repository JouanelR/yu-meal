const myScript = require('../controllers/script_dash.js');

const express = require('express');
const router = express.Router();
var idA = "62bc09302061c35ea0fbbd8b";
var nameA = "r";
var repA = {'Unnamed: 0': 0, 'index': 0, 'name': 'arriba   baked winter squash mexican style', 'id': 137739, 'minutes': 55, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'side-dishes', 'vegetables', 'mexican', 'easy', 'fall', 'holiday-event', 'vegetarian', 'winter', 'dietary', 'christmas', 'seasonal', 'squash']", 'nutrition': '[51.5, 0.0, 13.0, 0.0, 2.0, 0.0, 4.0]', 'ingredients': "['winter squash', 'mexican seasoning', 'mixed spice', 'honey', 'butter', 'olive oil', 'salt']", 'n_ingredients': 7, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/13/77/39/picWfGTtA.jpg'};
var idRecetteA;
//var lrepA = ['crunchy romaine salad with eggs and croutons', 'stuffed celery', 'stuffed artichoke hearts', 'chicken broccoli pizza  low carb', 'potato ham bake'];
var lrepA = [{'Unnamed: 0': 0, 'index': 0, 'name': 'arriba   baked winter squash mexican style', 'id': 137739, 'minutes': 55, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'side-dishes', 'vegetables', 'mexican', 'easy', 'fall', 'holiday-event', 'vegetarian', 'winter', 'dietary', 'christmas', 'seasonal', 'squash']", 'nutrition': '[51.5, 0.0, 13.0, 0.0, 2.0, 0.0, 4.0]', 'ingredients': "['winter squash', 'mexican seasoning', 'mixed spice', 'honey', 'butter', 'olive oil', 'salt']", 'n_ingredients': 7, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/13/77/39/picWfGTtA.jpg'}, 
{'Unnamed: 0': 724, 'index': 724, 'name': '7 up cake', 'id': 496, 'minutes': 87, 'tags': "['weeknight', 'time-to-make', 'course', 'main-ingredient', 'preparation', 'desserts', 'fruit', 'oven', 'cakes', 'dietary', 'tropical-fruit', 'pineapple', 'equipment', '4-hours-or-less']", 'nutrition': '[550.2, 37.0, 155.0, 18.0, 11.0, 22.0, 26.0]', 'ingredients': "['lemon supreme cake mix', 'pineapple instant pudding', 'vegetable oil', 'eggs', 'carbonated lemon-lime beverage', 'margarine', 'sugar', 'crushed pineapple', 'flour', 'angel flake coconut']", 'n_ingredients': 10, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/49/6/piclJbARg.jpg'}, 
{'Unnamed: 0': 9105, 'index': 9105, 'name': 'beefed up biscuit casserole', 'id': 9447, 'minutes': 55, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'casseroles', 'main-dish', 'beef', 'american', 'oven', 'potluck', 'kid-friendly', 'dietary', 'one-dish-meal', 'ground-beef', 'meat', 'to-go', 'equipment']", 'nutrition': '[526.9, 54.0, 17.0, 30.0, 86.0, 93.0, 2.0]', 'ingredients': "['lean ground beef', 'onion', 'green pepper', 'tomato sauce', 'chile', 'chili powder', 'garlic salt', 'country biscuits', 'mozzarella cheese', 'sharp cheddar cheese', 'sour cream', 'egg']", 'n_ingredients': 12, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/94/47/picKpzqZq.jpg'}, 
{'Unnamed: 0': 7966, 'index': 7966, 'name': 'basic crepes ii', 'id': 458, 'minutes': 65, 'tags': "['time-to-make', 'course', 'preparation', 'occasion', '5-ingredients-or-less', 'pancakes-and-waffles', 'breakfast', 'desserts', 'easy', 'dietary', 'low-sodium', 'low-in-something', '4-hours-or-less']", 'nutrition': '[100.1, 6.0, 0.0, 3.0, 7.0, 12.0, 3.0]', 'ingredients': "['eggs', 'flour', 'milk', 'butter', 'salt']", 'n_ingredients': 5, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/45/8/picSkQTnf.jpg'}, 
{'Unnamed: 0': 92055, 'index': 92055, 'name': 'van gogh s regret', 'id': 8558, 'minutes': 2, 'tags': "['15-minutes-or-less', 'time-to-make', 'preparation', 'occasion', 'for-1-or-2', '5-ingredients-or-less', 'easy', 'heirloom-historical', 'holiday-event', 'dietary', 'number-of-servings']", 'nutrition': '[8.9, 0.0, 9.0, 0.0, 0.0, 0.0, 0.0]', 'ingredients': "['absinthe', 'sugar cube', 'mineral water']", 'n_ingredients': 3, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/85/58/picXx1OS7.jpg'}, 
{'Unnamed: 0': 55, 'index': 55, 'name': 'bar  cheese', 'id': 42151, 'minutes': 35, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'preparation', 'occasion', 'appetizers', 'eggs-dairy', 'easy', 'beginner-cook', 'spreads', 'cheese', 'stove-top', 'dietary', 'gifts', 'copycat', 'inexpensive', 'novelty', 'equipment', 'number-of-servings']", 'nutrition': '[707.1, 76.0, 91.0, 147.0, 74.0, 161.0, 9.0]', 'ingredients': "['velveeta cheese', 'mayonnaise', 'horseradish', 'tabasco sauce', 'worcestershire sauce']", 'n_ingredients': 5, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/42/15/1/lEHgi5gHQomMzEZR7AuR_Bar%20Cheese.jpg'}, 
{'Unnamed: 0': 9105, 'index': 9105, 'name': 'beefed up biscuit casserole', 'id': 9447, 'minutes': 55, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'casseroles', 'main-dish', 'beef', 'american', 'oven', 'potluck', 'kid-friendly', 'dietary', 'one-dish-meal', 'ground-beef', 'meat', 'to-go', 'equipment']", 'nutrition': '[526.9, 54.0, 17.0, 30.0, 86.0, 93.0, 2.0]', 'ingredients': "['lean ground beef', 'onion', 'green pepper', 'tomato sauce', 'chile', 'chili powder', 'garlic salt', 'country biscuits', 'mozzarella cheese', 'sharp cheddar cheese', 'sour cream', 'egg']", 'n_ingredients': 12, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/94/47/picKpzqZq.jpg'}, 
{'Unnamed: 0': 12439, 'index': 12439, 'name': 'british  raspberry oaties', 'id': 134687, 'minutes': 60, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'lunch', 'snacks', 'fruit', 'easy', 'european', 'summer', 'english', 'dietary', 'seasonal', 'berries', 'raspberries', 'brunch']", 'nutrition': '[275.8, 24.0, 71.0, 10.0, 5.0, 49.0, 10.0]', 'ingredients': "['self-raising flour', 'salt', 'butter', 'rolled oats', 'caster sugar', 'fresh raspberries']", 'n_ingredients': 6, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/13/46/87/picdGrfCm.jpg'}, 
{'Unnamed: 0': 72057, 'index': 72057, 'name': 'red robin  teriyaki and pineapple burger', 'id': 208956, 'minutes': 105, 'tags': "['time-to-make', 'course', 'main-ingredient', 'preparation', 'for-1-or-2', 'healthy', 'lunch', 'beef', 'dietary', 'low-cholesterol', 'sandwiches', 'ground-beef', 'low-in-something', 'meat', 'number-of-servings', '4-hours-or-less']", 'nutrition': '[1178.1, 60.0, 377.0, 944.0, 148.0, 79.0, 42.0]', 'ingredients': "['hamburger meat', 'hamburger bun with sesame seeds', 'mayonnaise', 'lettuce', 'pineapple ring', 'teriyaki sauce', 'tomatoes', 'cheddar cheese']", 'n_ingredients': 8, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/20/89/56/tJiANt3NTSG0HvGcXkMc-Red-Robin-Teriyaki-and-Pinapple-Burger---208956-2.'}, 
{'Unnamed: 0': 63425, 'index': 63425, 'name': 'oyster sauce', 'id': 23410, 'minutes': 10, 'tags': "['15-minutes-or-less', 'time-to-make', 'course', 'preparation', 'low-protein', 'healthy', '5-ingredients-or-less', 'sauces', 'condiments-etc', 'easy', 'low-fat', 'stove-top', 'dietary', 'low-cholesterol', 'low-saturated-fat', 'low-calorie', 'savory-sauces', 'low-in-something', 'equipment', 'number-of-servings']", 'nutrition': '[76.0, 0.0, 11.0, 54.0, 1.0, 0.0, 5.0]', 'ingredients': "['oyster sauce', 'cornstarch', 'water', 'sugar']", 'n_ingredients': 4, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/23/41/0/picK5zaSx.jpg'}]
var dejarecommende = -1;


function sendDataCallback() {
    if (xhr.readyState == 4 && xhr.status == 201) {
        console.log("Creation data received :");
        dd = xhr.responseText
        //console.log("data received :"+typeof dd+dd)
        var data = JSON.parse(dd);
        lrepA = data.data;
        console.log("data received :"+lrepA);
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
        id : idA, name : nameA,  utils: myScript, donne: repA,
    });
}



exports.nextRepA = (req, res) => {
    if(dejarecommende == 9){
        myScript.recommendationHandle();
        console.log("recommendation");
        dejarecommende = 0;
    }
    console.log("12256889"+lrepA[dejarecommende]);
    repA = lrepA[dejarecommende];
}

