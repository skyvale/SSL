"use strict"
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode

// Make sure the following is installed:
/*
    sudo npm install -g express
    sudo npm install -g ejs
    sudo npm install -g request
    sudo npm install -g body-parser

    *if ejs has trouble installing, try doing the following-
        1. which npm
        2. copy the url and paste
        3. url install -g ejs --save

*/

const fs = require('fs');
const http = require('http');
const path = require('path');
const url = require('url');

var express = require("express");
var request = require("request");

// use Express to serve the server
let ejs = require("ejs"); // tell Express to use EJS as templating engine
const router = express.Router();
var app = express();
app.use(express.static(__dirname + '/public')); // tells the system where the public files are

// set up BODY PARSER
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs"); // tell the app to apply ejs rules from now on
app.engine("ejs", require("ejs").__express); // forces ejs to look at dynamic variables

// set up SESSIONS
const session = require("express-session");
app.use(session({secret:"secret",saveUninitialized:true,resave:true}));
var sess; // declare global variable

// ----------------------------------------------------------
// SET UP ROUTES
// *note* you need a Views folder to use EJS properly

router.get("/", function(req,res){
    // use global variable (sess) to request the current session
    sess = req.session;

    // to pass data into view, you can pass it here 
    // use .ejs instead of .html
    res.render("index", {pagename:"Home", sess:sess}); // /views/index.ejs

});

router.get("/about", function(req,res){
    sess = req.session;
    res.render("about", {pagename:"About", sess:sess}); // /views/about.ejs
});

// profile page
router.get('/profile', function(req,res){
    sess = req.session;
    // protects the profile page by redirecting if user is invalid
    if(typeof(sess) == "undefined" || sess.loggedin != true) {
        var errors = ["Not an authenticated user!"];
        res.render("index",{pagename:"Home", errors:errors});
    } else {
        res.render("profile", {pagename:"Profile", sess:sess});
    }
});

// logout page
router.get("/logout", function(req,res){
    sess = req.session;
    // logs out of current session
    sess.destroy(function(err){
        res.redirect("/");
    });
});


// route that catches the data from the login form request
router.post("/login", function(req,res){
    //the bodyparser will parse the info from the form via the NAME

    // VALIDATE USER INPUT
    var errors = []; // keep track of any errors that occurs

    // validate EMAIL
    if(req.body.email == ""){
        errors.push("Email is required!")
    } else if(!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(req.body.email)){
        errors.push("Email is not valid!")
    }

    // validate PASSWORD
    if(req.body.password == "") {
        errors.push("Password is required!");
    } else if(!/^[a-zA-Z]\w{3,14}$/.test(req.body.password)){
        errors.push("Password is not valid!");
    }

    // email is mike@aol.com
    // pass is abc123
    // if these credentials aren't met, add another error
    if(req.body.email != "mike@aol.com" && req.body.email != ""){
        errors.push("There is no user with that email!");
    } else if (req.body.email == "mike@aol.com" && req.body.password != "abc123") {
        errors.push("That password is incorrect!");
    }

    // write your if conditional here matching the username and password
    // then if the info matches, show the profile page
    if (req.body.email == "mike@aol.com" && req.body.password == "abc123"){
        sess = req.session;
        sess.loggedin = true;
        res.render("profile", {pagename:"Profile", sess:sess});      
    }

    console.log(errors);
    res.render("index",{pagename:"Home", errors:errors});

});

// ----------------------------------------------------------
// SET UP THE SERVER
app.use(express.static("public")); // creates public folder to the js pages
app.use("/", router); // makes sure you use the router for routing
var server = app.listen("8080");