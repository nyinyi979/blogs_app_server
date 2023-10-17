const express = require("express");
const app = express();

const cors = require("cors");

const { blogRouter } = require("./routes/blogs");
const { imageRouter } = require("./routes/createImage");
const { userRouter } = require("./routes/user");
const { readUserbyEmail, deleteUser, readUserbyID } = require("./prisma_methods/users/CRUD");
const { default: prisma } = require("../lib/prisma_object");
const { blogsByCategory } = require("./prisma_methods/blogs/searchBlogs");

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
export default app
//npx nodemon server/index 