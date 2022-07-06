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
var lrepA = [
{'Unnamed: 0': 0, 'index': 0, 'name': 'arriba   baked winter squash mexican style', 'id': 137739, 'minutes': 55, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'side-dishes', 'vegetables', 'mexican', 'easy', 'fall', 'holiday-event', 'vegetarian', 'winter', 'dietary', 'christmas', 'seasonal', 'squash']", 'nutrition': '[51.5, 0.0, 13.0, 0.0, 2.0, 0.0, 4.0]', 'steps': "['make a choice and proceed with recipe', 'depending on size of squash , cut into half or fourths', 'remove seeds', 'for spicy squash , drizzle olive oil or melted butter over each cut squash piece', 'season with mexican seasoning mix ii', 'for sweet squash , drizzle melted honey , butter , grated piloncillo over each cut squash piece', 'season with sweet mexican spice mix', 'bake at 350 degrees , again depending on size , for 40 minutes up to an hour , until a fork can easily pierce the skin', 'be careful not to burn the squash especially if you opt to use sugar or butter', 'if you feel more comfortable , cover the squash with aluminum foil the first half hour , give or take , of baking', 'if desired , season with salt']", 'ingredients': "['winter squash', 'mexican seasoning', 'mixed spice', 'honey', 'butter', 'olive oil', 'salt']", 'n_ingredients': 7, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/13/77/39/picWfGTtA.jpg'}, 
{'Unnamed: 0': 18469, 'index': 18469, 'name': 'chicken breasts lombardi', 'id': 49, 'minutes': 75, 'tags': "['weeknight', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'very-low-carbs', 'main-dish', 'poultry', 'oven', 'european', 'dinner-party', 'italian', 'chicken', 'dietary', 'low-carb', 'low-in-something', 'meat', 'chicken-breasts', 'equipment', '4-hours-or-less']", 'nutrition': '[627.7, 38.0, 8.0, 35.0, 115.0, 64.0, 4.0]', 'steps': '[\'cook mushrooms in 2 tbsp butter in a large skillet , stirring constantly , just until tender\', \'remove from heat\', \'set aside\', \'cut each chicken breast half in half lengthwise\', \'place each piece of chicken between two sheets of wax paper\', \'flatten to 1 / 8" thickness , using a meat mallet or rolling pin\', \'dredge chicken pieces in flour\', \'place 5 or 6 pieces of chicken in 1 to 2 tbsp butter in a large skillet\', \'cook over medium heat 3 to 4 minutes on each side or until golden\', \'place chicken in a lightly greased 13x9" baking dish , overlapping edges\', \'repeat procedure with remaining chicken and butter\', \'reserve pan drippings in skillet\', \'sprinkle reserved mushrooms over chicken\', \'add wine and broth to skillet\', \'bring to a boil\', \'reduce heat , and simmer , uncovered , 10 minutes , stirring occasionally\', \'stir in salt and pepper\', \'pour sauce over chicken\', \'combine cheeses and green onions\', \'sprinkle over chicken\', \'bake uncovered at 450 for 12 to 14 minutes\', \'broil 5 1 / 2" away from heat 1 to 2 minutes or until browned\']', 'ingredients': "['fresh mushrooms', 'butter', 'boneless skinless chicken breast halves', 'flour', 'marsala', 'chicken broth', 'salt', 'mozzarella cheese', 'parmesan cheese', 'green onion']", 'n_ingredients': 10, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/49/m1z1F8S5mAZgyImm5zYw_Lombardi%20Chicken%203.jpg'}, 
{'Unnamed: 0': 9105, 'index': 9105, 'name': 'beefed up biscuit casserole', 'id': 9447, 'minutes': 55, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'casseroles', 'main-dish', 'beef', 'american', 'oven', 'potluck', 'kid-friendly', 'dietary', 'one-dish-meal', 'ground-beef', 'meat', 'to-go', 'equipment']", 'nutrition': '[526.9, 54.0, 17.0, 30.0, 86.0, 93.0, 2.0]', 'steps': "['brown beef , onions and peppers and drain', 'add in tomato sauce , chilies , chili powder and garlic salt', 'simmer while preparing biscuits', 'seperate the biscuits and halve them', 'place i / 2 of the biscuits on the bottom of an ungreased 8-10 inch pan', 'slightly brown these in a 375 degree oven', 'remove', 'combine 1 / 2 of the cheese , sour cream and egg', 'mix well', 'remove meat mixture from the heat and stir in the sour cream mixture', 'spoon over the browned biscuits', 'this part is up to you , i like it both ways', 'you can now add remaining cheese then biscuits or place the biscuits on top of the meat and then the cheese', 'either way bake at 375 for 30-35 minutes']", 'ingredients': "['lean ground beef', 'onion', 'green pepper', 'tomato sauce', 'chile', 'chili powder', 'garlic salt', 'country biscuits', 'mozzarella cheese', 'sharp cheddar cheese', 'sour cream', 'egg']", 'n_ingredients': 12, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/94/47/picKpzqZq.jpg'}, 
{'Unnamed: 0': 92862, 'index': 92862, 'name': 'vegetarian white bean soup', 'id': 9071, 'minutes': 140, 'tags': "['weeknight', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'north-american', 'lunch', 'soups-stews', 'vegetables', 'american', 'vegetarian', 'dietary', 'comfort-food', 'taste-mood', '4-hours-or-less']", 'nutrition': '[189.4, 7.0, 14.0, 4.0, 10.0, 3.0, 10.0]', 'steps': "['soak beans for 20 minutes in enough lukewarm water to cover', 'heat oil in dutch oven over medium heat until hot', 'add onion and garlic , cook and stir until tender', 'drain the beans and add them along with the potatoes , carrots , celery , cabbage , parsley , bouillon , bay leaf and 6 cups water to dutch oven', 'mix well', 'bring to a boil', 'reduce heat', 'simmer 1-1 1 / 4 hours or until beans are tender', 'adding additional water if necessary']", 'ingredients': "['navy beans', 'olive oil', 'onion', 'garlic cloves', 'potatoes', 'carrots', 'celery', 'cabbage', 'fresh parsley', 'vegetable bouillon granules', 'bay leaf', 'water']", 'n_ingredients': 12, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/90/71/pic0xodtL.jpg'}, 
{'Unnamed: 0': 13270, 'index': 13270, 'name': 'brussels sprouts  with butter sauce  americano', 'id': 9228, 'minutes': 32, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'cuisine', 'preparation', 'north-american', 'side-dishes', 'american', 'stove-top', 'dietary', 'equipment']", 'nutrition': '[195.5, 27.0, 7.0, 1.0, 6.0, 55.0, 2.0]', 'steps': '[\'blanch the brussels sprouts in boiling water , with some salt , and a bit of fresh garlic , for 2 minutes\', \'remove , and steam them for 10 minutes\', "if you don\'t have a steamer , boil them for 7-10 minutes", \'meantime , in a saucepan , on simmer , melt the butter , with garlic , parmesan cheese , paprika , bayleaf , cayenne pepper , black pepper , onion , and oregano\', \'if you wish , melt and clarify the butter , before adding the other ingredients\', \'stir , occasionally\', \'remove , and drain the brussel sprouts\', \'place in a bowl , or a service plate , and add the butter sauce , and toss\', \'season with salt , and pepper , and sprinkle with parmesan cheese\', \'serve\', \'deadly\', \'enjoy\']', 'ingredients': "['brussels sprouts', 'sweet butter', 'garlic', 'parmesan cheese', 'paprika', 'bay leaf', 'cayenne pepper', 'black pepper', 'white onion', 'oregano']", 'n_ingredients': 10, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/92/28/C86ulkITRVa2BriAaVRR_20170620_204345-01.jpg'}, 
{'Unnamed: 0': 48130, 'index': 48130, 'name': 'jasmine rice with shallots  cumin and red pepper', 'id': 74583, 'minutes': 30, 'tags': "['30-minutes-or-less', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'occasion', 'side-dishes', 'rice', 'asian', 'indian', 'stove-top', 'dietary', 'spicy', 'pasta-rice-and-grains', 'taste-mood', 'equipment']", 'nutrition': '[233.2, 6.0, 1.0, 21.0, 12.0, 3.0, 13.0]', 'steps': "['heat the oil over medium high heat in a medium-sized sauce pan that has a lid', 'add the cumin and red pepper', 'then cook the shallots until soft- 2-3 minutes', 'remove shallots and set aside', 'add rice and cook , stirring constantly for 30 seconds', 'pour in the chicken broth and let rice cook on low heat until liquid is absorbed- 15-17 minutes', 'remove from heat and let sit for 5 minutes', 'stir in shallots , vinegar and salt and serve']", 'ingredients': "['vegetable oil', 'jasmine rice', 'chicken broth', 'shallots', 'ground cumin', 'red pepper flakes', 'rice wine vinegar', 'salt']", 'n_ingredients': 8, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/74/58/3/w6fsapWNSu6r3Vupfgxs_Jasmine%20Rice%20with%20Onions%20and%20Bell%20Peppers%20-%20Rice%20Cooker_0046.jpg'}, 
{'Unnamed: 0': 60371, 'index': 60371, 'name': 'ninfa s flan', 'id': 91763, 'minutes': 80, 'tags': "['time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'north-american', 'desserts', 'eggs-dairy', 'mexican', 'oven', 'dietary', 'low-sodium', 'low-in-something', 'equipment', '4-hours-or-less']", 'nutrition': '[270.9, 14.0, 147.0, 4.0, 14.0, 25.0, 13.0]', 'steps': '[\'choose a baking pan that will withstand the heat of the caramelized sugar---this is your flan pan\', \'caramelize sugar in a heavy skillet\', \'pour into flan pan\', \'whip remaining ingredients in food processor and then pour onto the caramelized sugar\', \'place flan pan into a larger pan with 1" of hot water and bake at 350f for 1 hour\', \'chill\', \'to caramelize sugar: place sugar only into a heavy pot or skillet over high heat , stirring constantly , until the sugar melts and starts to turn amber in color\', \'this syrup is very hot and must be handled quickly and safely\']', 'ingredients': "['sugar', 'eggs', 'egg yolks', 'vanilla', 'sweetened condensed milk', 'milk', 'cream cheese']", 'n_ingredients': 7, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/91/76/3/QeZjCpCsTOKv58lzxzVD_0S9A5102.jpg'}, 
{'Unnamed: 0': 47465, 'index': 47465, 'name': 'italian sausage casserole', 'id': 61621, 'minutes': 90, 'tags': "['weeknight', 'time-to-make', 'course', 'main-ingredient', 'cuisine', 'preparation', 'casseroles', 'main-dish', 'pork', 'potatoes', 'vegetables', 'oven', 'european', 'italian', 'dietary', 'one-dish-meal', 'low-carb', 'low-in-something', 'meat', 'peppers', 'equipment', '4-hours-or-less']", 'nutrition': '[1024.0, 96.0, 20.0, 125.0, 103.0, 110.0, 21.0]', 'steps': "['brown sausage in saute pan , then place in 9x13 baking dish', 'place potatoes , peppers , onion and garlic on top of sausage', 'pour crushed tomatoes over and sprinkle with basil , salt and pepper to taste', 'cover and bake at 350 degrees for 50 minutes or until done', 'remove cover and bake 20 minutes more']", 'ingredients': "['italian sausage', 'potatoes', 'green bell pepper', 'garlic', 'onion', 'crushed tomatoes', 'dried basil', 'salt and pepper']", 'n_ingredients': 8, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/61/62/1/pic37F2Mf.jpg'}, 
{'Unnamed: 0': 8415, 'index': 8415, 'name': 'bbq pork tenderloin with bacon', 'id': 94073, 'minutes': 18, 'tags': "['bacon', '30-minutes-or-less', 'time-to-make', 'main-ingredient', 'preparation', 'occasion', 'for-1-or-2', 'pork', 'barbecue', 'dinner-party', 'dietary', 'seasonal', 'meat', 'brunch', 'equipment', 'grilling', 'number-of-servings', 'technique']", 'nutrition': '[543.6, 34.0, 0.0, 447.0, 123.0, 25.0, 9.0]', 'steps': "['fennel spice:', 'put the fennel seeds , coriander seeds , and peppercorns in a heavy pan over medium heat', 'watch carefully , tossing frequently so the seeds toast evenly', 'when light brown and fragrant , pour the seeds onto a plate to cool', 'they must be cool before grinding or they will gum up the blades', 'pour the seeds into a blender and add the kosher salt', 'blend to a fine powder , shaking the blender occasionally to redistribute the seeds', 'store in a tightly sealed glass jar in a cool , dry place , or freeze', 'assembling the skewers:', 'rub both sides of the pork medallions with the spice rub', 'take a 1 / 2 slice of bacon and wrap it around the outer edge of each medallion', 'secure it by pushing a skewer right through the middle of the medallion', 'place 3 medallions on each skewer', 'you should now have 3 round pieces of pork showing , the bacon from one medallion touching the next one on each skewer', 'barbecue on high heat', 'flip after 4 minutes', 'continue cooking until browned and cooked']", 'ingredients': "['fennel', 'fennel seed', 'coriander seeds', 'white peppercorns', 'kosher salt', 'pork tenderloin', 'bacon', 'skewers']", 'n_ingredients': 8, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/94/07/3/picNO4gAO.jpg'}, 
{'Unnamed: 0': 44553, 'index': 44553, 'name': 'holiday bakery tray cookies', 'id': 15588, 'minutes': 40, 'tags': "['60-minutes-or-less', 'time-to-make', 'course', 'preparation', 'occasion', 'desserts', 'oven', 'holiday-event', 'cookies-and-brownies', 'easter', 'dietary', 'christmas', 'new-years', 'low-sodium', 'valentines-day', 'low-in-something', 'equipment', 'number-of-servings']", 'nutrition': '[930.0, 74.0, 202.0, 0.0, 19.0, 149.0, 38.0]', 'steps': '[\'preheat oven to 350f\', \'cream softened butter\', \'mix in sugar thoroughly\', \'beat in egg yolk , and extracts until light and fluffy\', \'stir in flour by hand , 1 cup at a time , making a soft dough\', \'press cookies out following directions for your cookie press\', \'suggestions are "fingers" , "s-swirls" , "stars" , and "shells"\', \'bake 8-10 minutes at 350\', \'let cool completely on a rack\', \'optional: melt 8 squares of semisweet chocolate over hot water\', \'when melted , remove from flame but leave it over the hot water\', \'dip each cookie in hot chocolate , resting it on a long tined fork\', \'it can be half dipped or bottom dipped or however you choose\', \'let set upside down on rack or waxed paper\', \'it helps set the chocolate if you place the dipped cookies in the refrigerator for 15 minutes\', \'the chocolate should remain solid at room temperature , but a hot summer day could make it soft enough to give anyone sticky fingers\', \'in that case store in the refrigerator\', \'while chocolate is still warm you can dip the edge in coconut or ice cream sprinkles the finger shapes can also be spread with raspberry or apricot jam and sandwiched together\', \'this produces the fancy cookies seen on bakery trays\', \'for a different flavor leave out the almond extract and substitute 2 teaspoons of orange or lemon extract\']', 'ingredients': "['sweet butter', 'granulated sugar', 'egg yolk', 'vanilla extract', 'almond extract', 'flour', 'semisweet chocolate']", 'n_ingredients': 7, 'Images Solo': 'https://img.sndimg.com/food/image/upload/w_555,h_416,c_fit,fl_progressive,q_95/v1/img/recipes/15/58/8/picPNVs6K.jpg'}]
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



exports.nextRepA = (req, res) => {
    if(dejarecommende % 4 == 0){
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
    

    

    var { vega2,vege2,glut2,meat2 } = req.body;
    console.log(vega2,vege2,glut2,meat2);

    var vega2 = parseBool(vega2);
    var vege2 = parseBool(vege2);
    var glut2 = parseBool(glut2);
    var meat2 = parseBool(meat2);



    var mongoose = require('mongoose');
    var id_confirm = mongoose.Types.ObjectId(req.user.id);
    var MongoClient = require('mongodb').MongoClient;
    var url = "mongodb://127.0.0.1:27017/";



    MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myquery = { _id: id_confirm };
    var newvalues = { $set: {vegan: vega2, vegetarien: vege2, gluten_free : glut2 } };
    dbo.collection("users").updateOne(myquery, newvalues, function(err, res) {
        if (err) throw err;
        console.log("1 document updated");
        db.close();
    });
    });



    res.render('profile', {
        name: req.user.name, id : req.user.id, vegan :req.user.vegan, vegetarien : req.user.vegetarien, gluten_free : req.user.gluten_free, egg : req.user.soy, soy : req.user.soy, lactose : req.user.lactose, nuts : req.user.nuts, peanuts : req.user.peanuts, seafood : req.user.seafood, sesame : req.user.sesame, utils : myScript
    });
}


