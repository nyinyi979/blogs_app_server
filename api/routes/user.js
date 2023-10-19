const express = require('express');
const router = express.Router();

const prisma = require("../../lib/prisma_object")
const cors = require('cors');
const { readUserbyID, updateName, updateUsername, updatePhone, updateEmail, addCategoryToUser, removeCategoryFromUser, readUserbyEmail, createUser, readUserbyUsername } = require('../prisma_methods/users/CRUD');
router.use(cors({origin:  ['https://blogs-app-one.vercel.app', 'http://blogs-app-one.vercel.app', 'http://localhost:3000']}));
//for sending code for verfication
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

router.use(express.json());
router.use(express.urlencoded({extended: true}));

router.get('/getUser' , async(req, res)=>{
    let id = jwt.verify(req.body.id , process.env.NEXT_PUBLIC_JWT_SECRET);
    let result = await readUserbyID(id);
    if(result === 'error') return res.json(new Error("Server error"));
    else return res.json(result);
})
router.post('/getUserByID' , async(req , res)=>{
    let id = jwt.verify(req.body.id , process.env.NEXT_PUBLIC_JWT_SECRET);

    let result = await readUserbyID(id);
    let categories_ = await prisma.default.category.findMany();
    result.categories_ = categories_;
    if(result === 'error') return res.json(new Error("Server error"));
    else return res.json(result);
})

//update values of users
router.post('/updateName' , async(req, res)=>{
    let id = req.body.id;
    let name = req.body.name;
    let result = await updateName(id , name);
    if(result === 'error') return res.json(new Error("Server error"));
    else return res.json("DONE");
})
router.post('/updateUsername' , async(req, res)=>{
    let id = req.body.id;
    let username = req.body.username;
    let result = await updateUsername(id , username);
    if(result === 'error') return res.json(new Error("Server error"));
    else return res.json("DONE");
})
router.post('/updatePhone' , async(req, res)=>{
    let id = req.body.id;
    let phone = req.body.phone;
    let result = await updatePhone(id , phone);
    if(result === 'error') return res.json(new Error("Server error"));
    else return res.json("DONE");
})
router.post('/updateEmail' , async(req, res)=>{
    let id = req.body.id;
    let email = req.body.email;
    let result = await updateEmail(id , email);
    if(result === 'error') return res.json(new Error("Server error"));
    else return res.json("DONE");
})
router.post('/addCategoryToUser' , async(req, res)=>{
    let id = req.body.id;
    let category = req.body.category;
    let result = await addCategoryToUser(id , category);
    if(result === 'error') return res.json(new Error("Server error"));
    else return res.json("DONE");
})
router.post('/removeCategoryFromUser' , async(req, res)=>{
    let id = req.body.id;
    let category = req.body.category;
    let result = await removeCategoryFromUser(id , category);
    if(result === 'error') return res.json(new Error("Server error"));
    else return res.json("DONE");
})


const transporter = new nodemailer.createTransport({
    service : "Gmail" , 
    host : "smtp.gmail.com" , 
    auth : {
        user : "nyinyi095062687@gmail.com" , 
        pass : "mozm skcx mpsb ddpy"
    }
});
//get verification code  
async function sendMail(number,toEmail){
    const info = await transporter.sendMail({
        from: 'Z-blogs', // sender address
        to: toEmail, // list of receivers
        subject: "Hello ✔ This is your confirmation code!", // Subject line
        html: `<p><b>${number}</b></p>`, // html body
    });
}

router.post('/getCodeL' , async(req, res)=>{
    let mail = req.body.mail;
    let user = await readUserbyEmail(mail);
    if(user === null){
        return res.json({notFound: 'xdd'})
    }
    let randomNumber = (Math.random() * (90000 - 10000 + 1) + 10000).toFixed(0);
    console.log(randomNumber);
    sendMail(randomNumber , mail);
    return res.json({code: randomNumber});
}) 
router.post('/getCodeS' , async(req, res)=>{
    let mail = req.body.mail;
    let user = await readUserbyEmail(mail);
    if(user !== null){
        return res.json({notFound: 'xdd'})
    }
    let randomNumber = (Math.random() * (90000 - 10000 + 1) + 10000).toFixed(0);
    console.log(randomNumber);

    sendMail(randomNumber , mail);
    return res.json({code: randomNumber});
})

//check user 
router.post('/checkExistingUser', async(req, res)=>{
    let mail = req.body.mail;
    let user = await readUserbyEmail(mail);
    console.log(user);
    return res.json({id: jwt.sign(user.id , process.env.NEXT_PUBLIC_JWT_SECRET)})
})

router.post('/checkNewUser' , async(req, res)=>{
    let mail = req.body.gmail;
    let name = req.body.name;
    let username = req.body.username;
    let phone = req.body.phone;
    let result = await createUser(name , username, phone , mail);
    if(result === 'error') return res.json(new Error("error"));
    if(result === 'user exists') return res.json({nameTake: 'true'})
    return res.json({id: jwt.sign(result, process.env.NEXT_PUBLIC_JWT_SECRET)});
})
//check google user
router.post('/checkGoogleUser' , async(req , res)=>{
    let data = req.body.data;
    console.log(data);
    if(data === undefined) return new Error();
    let id = data.id;
    let name = data.displayName;
    let username = (data.name.familyName + data.name.givenName).split(" ").join(""); 
    let photoURL = data.photos[0].value;
    let email = data.emails[0].value;
    let result = await readUserbyID(data.id);
    if(result === null) {
        let result_ = await createUser(name , username.toLowerCase() , '' , email , photoURL , id)
        let token = jwt.sign(result_, process.env.NEXT_PUBLIC_JWT_SECRET);
        console.log(result_ , token);
        return res.json({token: token , new: true});
    }
    let token = jwt.sign(result.id , process.env.NEXT_PUBLIC_JWT_SECRET);
    return res.json({token: token , new:false});
});
exports.userRouter = router