const express = require("express");
const app = express();

const cors = require("cors");

const { blogRouter } = require("./api/routes/blogs");
const { imageRouter } = require("./api/routes/createImage");
const { userRouter } = require("./api/routes/user");
const { readUserbyEmail, deleteUser, readUserbyID } = require("./api/prisma_methods/users/CRUD");
const { default: prisma } = require("./lib/prisma_object");
const { blogsByCategory } = require("./api/prisma_methods/blogs/searchBlogs");

app.use('/api',imageRouter);
app.use(blogRouter);
app.use(userRouter)
app.use(cors({origin: ['https://blogs-app-alpha.vercel.app','http://blogs-app-alpha.vercel.app', 'http://localhost:3001']}))
app.use(express.json());
app.use(express.urlencoded({extended: true}))



// add custom path here 
// server.post('/request/custom', custom);  



app.get('/',async(req , res)=>{
    res.end("DONE");
})

app.listen(5000, async() => {
	console.log('Ready on http://localhost:5000');
})
//npx nodemon server/index 