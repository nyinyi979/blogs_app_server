//setting up the route for callback
const express = require("express");
const Google_router = express.Router();
module.exports = (passport) => {
    return ( 
        Google_router.get('http://localhost:3000/google', 
            passport.authenticate('google',{
                failureRedirect : 'http://localhost:3000/login' ,
                successRedirect : 'http://localhost:3000/home' 
            })
)
)}
