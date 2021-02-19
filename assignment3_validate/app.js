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

var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs"); // tell the app to apply ejs rules from now on
app.engine("ejs", require("ejs").__express); // forces ejs to look at dynamic variables

// ----------------------------------------------------------
// SET UP ROUTES
// *note* you need a Views folder to use EJS properly

router.get("/", function(req,res){
    // to pass data into view, you can pass it here 
    // use .ejs instead of .html
    res.render("index", {pagename:"Home"}); // /views/index.ejs

});

router.get("/about", function(req,res){
    res.render("about", {pagename:"About"}); // /views/about.ejs
});

// route that catches the data from the login form request
router.post("/login", function(req,res){
    //the bodyparser will parse the info from the form
    console.log(req.body.firstname); //working
    console.log(req.body.lastname); //working
    console.log(req.body.city); //working
    console.log(req.body.state); //working
    console.log(req.body.zipcode); //working
    console.log(req.body.male); // NOPE
    console.log(req.body.female); // NOPE
    console.log(req.body.consent); //working
    console.log(req.body.bio); //working

    // VALIDATE USER INPUT
    var errors = []; // keep track of any errors that occurs
    if(req.body.firstname === "") {
        errors.push("First name is required!");
    }
    if (req.body.lastname === "") {
        errors.push("Last name is required!");
    }
    if (req.body.city === "") {
        errors.push("City is required!");
    }
    if (req.body.lastname === "") {
        errors.push("State is required!");
    }
    if (req.body.bio === "") {
        errors.push("Bio is required!");
    }
    if (req.body.consent !== "true") {
        errors.push("You must consent to use this website!");
    }

    // validate using 'regular expression'
    let validateZip = /^\d{5}(?:[-\s]\d{4})?$/;
    if(!validateZip.test(req.body.zipcode)) {
        errors.push("Zip code is not valid!");  
    }

    // checks if a radio button is selected (user must select one)
    // if (document.getElementById("male").checked && document.getElementById("female").checked)

    res.render("index",{pagename:"Home"});

});

// ----------------------------------------------------------
// SET UP THE SERVER
app.use(express.static("public")); // creates public folder to the js pages
app.use("/", router); // makes sure you use the router for routing
var server = app.listen("8080");