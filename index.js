const express = require("express");
const app = express();

const cors = require("cors");

const { blogRouter } = require("./api/routes/blogs");
const { imageRouter } = require("./api/routes/createImage");
const { userRouter } = require("./api/routes/user");
const axios = require('axios');
const path = require('path')
var dotenv = require("dotenv");
const { token } = require("./api/dropbox/dropbox");
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
app.use('/api',imageRouter);
app.use(blogRouter);
app.use(userRouter);
app.use(token)
app.use(cors({origin: ['https://blogs-app-one.vercel.app','http://blogs-app-one.vercel.app', 'http://localhost:3000']}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.get('/',async(req , res)=>{
    res.end("DONE");
})

app.listen(5000, async() => {
	console.log('Ready on http://localhost:5000');
})
//npx nodemon server/index 