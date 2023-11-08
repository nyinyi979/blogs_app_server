"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dropbox = void 0;
var path = require("path");
var dotenv = require("dotenv");
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

var Dropbox = require("dropbox");
//GLOBAL DROPBOX OBJECT - ONLY FOR SERVER ( DOESN'T WANT TO INITIALIZE EVERYTIME )
exports.dropbox = new Dropbox.Dropbox({accessToken: process.env.NEXT_PUBLIC_REFRESH_TOKEN , clientId: process.env.NEXT_PUBLIC_DROPBOX_ID , clientSecret: process.env.NEXT_PUBLIC_DROPBOX_SECRET});
//npx tsc ./api/dropbox/dropbox.ts
