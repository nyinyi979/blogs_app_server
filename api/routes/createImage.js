const express = require("express");
const router = require("express").Router();

//path and filesystem for downloading the image in the server and putting it in dropbox
const path = require("path");
const fs = require("fs");

//a library required for file upload 
const multer = require("multer");

//image id
const uuid = require("uuid");

const { dropbox } = require("../dropbox/dropbox");
const { addImage, removeImage } = require("../prisma_methods/blogs/update");

//CORS setup
const cors = require("cors");

//DOTENV 
require("dotenv").config({path:path.resolve(__dirname , '../../.env')})

router.use(express.json());
router.use(express.urlencoded({extended: true}));
router.use(cors({origin:  ['https://blogs-app-alpha.vercel.app', 'http://localhost:3001']}))


//multer storage for saving the images
const storage = multer.diskStorage({
    destination: 'server/images',
    filename: function (req, file, cb) {
        let fileName = file.originalname.split('.')[0] + '-' + uuid.v4().split("-")[0] + '.png';
        cb(null, fileName);
    }
})

//multer config
const upload = multer({ dest: '../images/' , limits: {fileSize: 2000000 } , storage: storage });

//route to upload the image 
router.post('/imageUpload' , upload.single('avatar') , async(req , res)=>{
    //the name is changed in the storage, this will get the modified name
    fileName = await req.body.name;

    //read the image and upload it to dropbox
    fs.readFile(path.resolve(__dirname , '../images' , req.file.filename),async(err , contents)=>{
        await dropbox.filesUpload({
            path: '/' + req.file.filename,
            contents
        }).then(async(result_)=>{ 
            //delete the image after uploading
            fs.unlinkSync(path.resolve(__dirname , '../images' , req.file.filename));
            //image link added to database 

            let result = await addImage(req.body.id , result_.result.path_lower , req.body.location);
            if(typeof result === "string"){
                dropbox.filesDeleteV2({path: result_.result.path_lower});
                return res.status(400).send({
                    message: result
                 });
            }
            else {
                return res.json(result);
            }
        }).catch((err)=>{
            console.log(err);
        })
    })
})

router.post('/deleteImage',async(req, res)=>{
    let result = await removeImage(req.body.url);
    if(result === 'error'){
        return res.json(new Error("Something happened"));
    }
    return res.json("DONE");
})
exports.imageRouter = router
