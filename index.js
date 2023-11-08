const express = require("express");
const app = express();

const cors = require("cors");

const { blogRouter } = require("./api/routes/blogs");
const { imageRouter } = require("./api/routes/createImage");
const { userRouter } = require("./api/routes/user");
const axios = require('axios');
const path = require('path')
var dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
app.use('/api',imageRouter);
app.use(blogRouter);
app.use(userRouter)
app.use(cors({origin: ['https://blogs-app-one.vercel.app','http://blogs-app-one.vercel.app', 'http://localhost:3000']}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))

let access_token = 'sl.BpfVtQy4JTeHTVrxoGdcpTSNqMkiDGwDEdcFG4xNYbBoRw0iLgFRneBGEUYPXc6oDZWgSvYZrZuL8_96p2tucP7TCczuUppP2cTG3PU_HDiiW_upKebvoohShAqgXXMYLRctMnCu-9xpR_KNicBmRHs';
setInterval(()=>{
    axios.post(
        'https://api.dropboxapi.com/oauth2/token',
        new URLSearchParams({
        'code': process.env.NEXT_PUBLIC_DROPBOX_KEY,
        'grant_type': 'authorization_code',
        'client_id' : process.env.NEXT_PUBLIC_DROPBOX_ID,
        'client_secret': process.env.NEXT_PUBLIC_DROPBOX_SECRET,
        })
    ).then((res)=>{
        console.log(res);
        access_token = res.data.access_token;
    }).catch((err)=>{
        console.log(err)
    })

}, 14400)
// add custom path here 
// server.post('/request/custom', custom);  
app.get('/getToken', async(req, res)=>{
    res.send(access_token);
})
app.get('/',async(req , res)=>{
    res.end("DONE");
})

app.listen(5000, async() => {
	console.log('Ready on http://localhost:5000');
})
//npx nodemon server/index 