//authentification
const express = require('express');
const router = express.Router();
const auth = require("../utils/users.auth");
const userRepo = require("../utils/users.repository");
const {response, request} = require("express");
const dealRepo = require("../utils/deal.repository");
router.get("/login", (request, response) => {
    response.render('login_page');
});
router.get("/loginfail", (request, response) => {
    response.render('loginfail');
});
router.get("/profile", (request, response) => {
    response.render('profile');
});
router.get("/signup",(request,response)=>{
    var user = userRepo.getBlankUser();
    response.render("signup", { "oneUser": user});
} )
router.get("/blankpost",(request,response)=>{
    var post = dealRepo.getBlankPost();
    response.render("blankpost", { "onePost": post});
} )
router.post("/profile", displayUserData);
router.get("/user", auth.checkAuthentication("USER"), userAction);
router.get("/admin", auth.checkAuthentication("ADMIN"), adminAction);
router.get("/protected", protectedGetAction);
router.get("/userlist", auth.checkAuthentication("ADMIN"), userListAction);
router.get("/usershow/:userId",auth.checkAuthentication("ADMIN"), userShowAction);
router.get("/useredit/:userId",auth.checkAuthentication("ADMIN"), userEditAction);
router.get("/userpostupd/:userId",auth.checkAuthentication("USER"), userpostUpdateAction);
router.get("/userdel/:userId",auth.checkAuthentication("ADMIN"), userDelAction);
router.get("/oneuserlist/:userId",auth.checkAuthentication("USER"), oneuserListAction);
router.post("/loginpost", loginPostAction);
router.get("/logout", logoutAction);
router.post("/postsignup/:userId", signupAction);
//router.post("/deluser/:userId",userDelAction)
//router.post("/postsignup/:userId", userEditAction);
async function displayUserData(request, response){

    var user = await userRepo.getOneUser(request.body.username);
    console.log(user);
    return response.render('profile', { "oneUser": user });

}
async function userAction(request, response) {
    let userData = await userRepo.getOneUser(request.user.user_username);
    var userJson = JSON.stringify(userData)
    var myContent=[];
    myContent.push({ "category": "method",  "message": "ADMIN" });
    myContent.push({ "category": "userdata",  "message": userJson });
    response.render("user", { "content": myContent });
}
async function userpostUpdateAction(request, response) {

    // response.send("UPDATE ACTION");
    var postId = request.params.postId;
    console.log(postId);
    if (postId==="0") postId = await dealRepo.addOnePost(request.body.post_userid);
    var numRows = await dealRepo.editOnePost(postId,
        request.body.post_name,
        request.body.post_userid,
        request.body.post_baseprice,
        request.body.post_reducedprice,
        request.body.post_link,
        request.body.post_description,
        request.body.post_category,
        request.body.post_alltimelow,
        request.body.post_date);


    request.session.flashMessage = "ROWS UPDATED: " + numRows;
    response.redirect("/post/list");
}
async function signupAction(request, response) {

    // response.send("UPDATE ACTION");
    var userId = request.params.userId;
    console.log(userId);
    if (userId=="0") userId = await userRepo.addOneUser();
    var numRows = await userRepo.editOneUser(userId,
        request.body.user_username,
        request.body.user_email,
        request.body.user_password,
        request.body.user_description);

    request.session.flashMessage = "ROWS UPDATED: "+numRows;
    response.redirect("/connexion/profile");
}
async function userEditAction(request, response) {

    if (request.params.userId!=="0")
        var user = await userRepo.getOneUserId(request.params.userId);
    else
        var user = userRepo.getBlankUser();
    response.render("user_edit", { "oneUser": user });
}
async function oneuserListAction(request, response){
    // response.send('List action..');
    var user = await userRepo.getOneUserId(request.params.userId);
    response.render("oneuser_list", { "oneUser": user });

}
function logoutAction(request, response) {
    request.logOut();
    response.redirect("/");
}
async function adminAction(request, response) {
    let userData = await userRepo.getOneUser(request.user.user_username);
    var userJson = JSON.stringify(userData)
    var myContent=[];
    myContent.push({ "category": "method",  "message": "ADMIN" });
    myContent.push({ "category": "userdata",  "message": userJson });
    response.render("admin", { "content": myContent });
}
function protectedGetAction(request, response) {
    if (request.isAuthenticated()) {
        if (request.user.user_role === "ADMIN") {
            response.redirect("/post/admin");
        } else {
            response.redirect("/post/user");
        }
    } else {
        response.redirect("/post");
    }
}
async function loginPostAction(request, response) {
    areValid = await userRepo.areValidCredentials(request.body.username, request.body.userpass);

    if (areValid) {
        user = await userRepo.getOneUser(request.body.username);
        await request.login(user, function (err) {
            if (err) { return next(err); }
        });
        if (request.user.user_role === "ADMIN") {
            return response.redirect("/connexion/admin");
        } else {
            return response.redirect("/");
        }

    } else {
        response.redirect("/connexion/loginfail");

    }
}
async function userDelAction(request, response){
    // response.send('Del action... CAR '+request.params.carId);
    var numRows = await userRepo.delOneUser(request.params.userId);

    // only after session
    request.session.flashMessage = "ROWS DELETED: "+numRows;

    response.redirect("/connexion/userlist");
}
async function userListAction(request, response){
    // response.send('List action..');
    var user = await userRepo.getAllUser();
    // response.render("cars_list", { "cars": cars });

    var flashMessage = request.session.flashMessage;
    request.session.flashMessage = "";
    response.render("user_list", { "user": user, "flashMessage": flashMessage })}

async function userShowAction(request, response){
    // response.send('Show action... CAR '+request.params.carId);
    var user = await userRepo.getOneUserId(request.params.userId);
    response.render("user_show", { "oneUser": user });
}




module.exports = router;