"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropbox = void 0;
var path = require("path");
var dotenv = require("dotenv");
var axios = require('axios');
const express = require('express');
const router = express.Router();
dotenv.config({ path: path.resolve(__dirname, '../../.env') });
let access_token = 'sl.BpfuNSx-z9puFtYK33cjsS6ti2HFpaqPiOxgFQOvj9iEsL45b_AYrcTIt3OzmW39H7UmvtbqwdaM18lOrigXdWfwXZN6tPpxMmZFcSUGY3WBQsOaoYfQoUj4o9mNyg-UiAguL_yW_5CoEzANSTUsBFU';
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