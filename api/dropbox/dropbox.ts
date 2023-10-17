import * as path from 'path';
import * as dotenv from 'dotenv';
dotenv.config({path:path.resolve(__dirname , '../../.env')});
import * as Dropbox from 'dropbox';

//GLOBAL DROPBOX OBJECT - ONLY FOR SERVER ( DOESN'T WANT TO INITIALIZE EVERYTIME )
export const dropbox = new Dropbox.Dropbox({accessToken: process.env.NEXT_PUBLIC_DROPBOX_TOKEN});
//npx tsc ./api/dropbox/dropbox.ts