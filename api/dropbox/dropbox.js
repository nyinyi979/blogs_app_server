"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropbox = void 0;
var path = require("path");
var dotenv = require("dotenv");
var axios = require('axios');
const express = require('express');
const router = express.Router();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
let access_token = 'sl.BpcjqqsV27ffpOWfW6GcDpF_cbpB9M1Kc8yE6tOT-6jz1Ooqesg2LhIcl8c_0yndJ-CIvHYBIvWORkwfYit1eAyfuWq902bLYI3eflcs-QZTlOESCu9FIghlJ5EJKaS1jMcdK1V75JOEbBbeHutFkaE';
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
console.log(access_token)
// add custom path here 
// server.post('/request/custom', custom);  
router.get('/getToken', async(req, res)=>{
    res.send(access_token);
})
var Dropbox = require("dropbox");
//GLOBAL DROPBOX OBJECT - ONLY FOR SERVER ( DOESN'T WANT TO INITIALIZE EVERYTIME )
exports.dropbox = new Dropbox.Dropbox({ accessToken: access_token });
//npx tsc ./api/dropbox/dropbox.ts

exports.token = router