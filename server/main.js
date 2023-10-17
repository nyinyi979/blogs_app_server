const express = require("express");
const app = express();
const {image_router} = require("./routes/createImage");
const fs = require("fs");
const path = require("path");
app.use('/api',image_router);
app.listen(5000 , ()=>{
    console.log("HELLO");
})
//npx nodemon server/main 