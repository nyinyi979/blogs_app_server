const express = require('express');
const router = express.Router();

const prisma = require("../../lib/prisma_object")
const cors = require('cors')
//METHODS
const { deleteBlog, createBlog, Publish , UnPublish } = require('../prisma_methods/blogs/CPD');
const { updateTitleAndContent, removeCategory, addCategory, addLike, removeLike } = require("../prisma_methods/blogs/update");
const { blogsByCategory, blogsByDate, blogsByAuthor, addDays, blogsByAuthorID, blogsByCategories } = require("../prisma_methods/blogs/searchBlogs");
const { getBlog_P } = require("../prisma_methods/blogs/getBlog")
const { readUserbyID, readUserbyUsername } = require("../prisma_methods/users/CRUD");

router.use(cors({origin: ['https://blogs-app-one.vercel.app', 'http://blogs-app-one.vercel.app', 'http://localhost:3000']}));

router.use(express.json());
router.use(express.urlencoded({extended: true}));
const jwt = require("jsonwebtoken");
//for searching one category
router.get('/blogsByCategory' , async(req , res)=>{
    let count = await prisma.default.post.count({
        where:{
            categories:{
                some:{
                    name: req.query.category
                }
            }
        }
    });
    if(count === 0) return res.json(new Error("No posts found"))
    let result = await blogsByCategory(req.query.category,Number(req.query.t),Number(req.query.s))
    return res.json({result: result , count: count})
});

//for home page with array of categories 
//this function is to get all posts counts for the given categories
async function doStuffsBeforeGettingBlogs(id_ ){
let user_values = {id: '' , categories: '' , post_counts: 0 , posts: []}; 
    let id = jwt.verify(id_ , process.env.NEXT_PUBLIC_JWT_SECRET);
    user_values.id = id;
    let { categories } = await readUserbyID(id);
    user_values.categories = categories;
    for(let i = 0; i<categories.length; i++){
        let count = await prisma.default.post.count({
            where:{
                categories:{
                    some:{
                        name: user_values.categories[i].name
                    }
                }
            }
        });
        user_values.post_counts += count;
    }
    return user_values;
}
router.get('/blogsByCategories' , async(req, res)=>{
    console.log(req.query.id)
    let user_values = await doStuffsBeforeGettingBlogs(req.query.id , Number(req.query.t) , Number(req.query.s))
    let result = await blogsByCategories(user_values.categories, Number(req.query.t) , Number(req.query.s));
    return res.json({count: user_values.post_counts , result: result})
})
//for searching blogs by timestamp
router.get('/blogsByTime' , async(req , res)=>{
    let today = new Date(req.query.date);
    let tomorrow = addDays(today , 1);
    let count = await prisma.default.post.count({
        where: {
            createdAt: {
                gte: today,
                lt: tomorrow
            },
            published: true
        }
    });
    if(count === 0) return res.json(new Error("No posts found"))
    let result = await blogsByDate(new Date(req.query.date),Number(req.query.t) , Number(req.query.s));
    return res.json({result: result , count: count})
});


//get blogs by writters
router.get('/blogsByUser', async(req, res)=>{
    let name_ = await readUserbyUsername(req.query.user);
    if(name_ === null) return res.json(new Error("User not found"));
    let result = await blogsByAuthor(name_.username, Number(req.query.t) , Number(req.query.s));
    console.log(result)
    return res.json({result: result , count: name_._count.posts})
})

//get blogs by ID
router.get('/blogsByUserID', async(req, res)=>{
    let id = jwt.verify(req.query.id , process.env.NEXT_PUBLIC_JWT_SECRET);
    let user = await readUserbyID(id);
    console.log(user , id)
    if(user === null) return res.json(new Error("User not found"));
    let result = await blogsByAuthorID(user.id, Number(req.query.t) , Number(req.query.s) , 'asc');
    return res.json({result: result , count: user._count.posts , user: user})
})

//get blogs by IDD
router.get('/blog/:id' , async(req , res)=>{
    let result = await getBlog_P(req.params.id);
    if(result === null) return res.json(new Error("Blog not found"));
    if(req.query.userID) {
        let id = jwt.verify(req.query.userID , process.env.NEXT_PUBLIC_JWT_SECRET);
        let user = await readUserbyID(id);
        if(result.author[0].username !== user.username) {
            return res.json(new Error("Something went wrong!"));
        }
    }
    return res.json(result);
})
router.get('/checkLike' , async(req, res)=>{
    let id = jwt.verify(req.query.userID , process.env.NEXT_PUBLIC_JWT_SECRET);
    let result = await prisma.default.reaction.findFirst({
        where:{
            postID: req.query.postID,
            reactor:{
                every:{
                    id: id
                }
            }
        }
    })
    if(result === null) return res.json('No');
    else return res.json(result);
})
router.get('/addLike' , async(req, res)=>{
    if(typeof req.query.userID === 'undefined') return res.json(new Error("Something went wrong"))
    let id = jwt.verify(req.query.userID , process.env.NEXT_PUBLIC_JWT_SECRET);
    let result = await addLike(req.query.postID , id);
    if(result === 'error') return res.json(new Error("Server error"));
    return res.json(result);
})
router.get('/removeLike' , async(req, res)=>{
    console.log(req.query.id);
    let result = await removeLike(Number(req.query.id));
    if(result === 'error') return res.json(new Error("server error"));
    return res.json("DONE");
})
//create a blog and save it to draft
router.post('/createBlog' , async(req, res)=>{
    let authorID = jwt.verify(req.body.id , process.env.NEXT_PUBLIC_JWT_SECRET);
    let title = req.body.title;
    let content = req.body.content;
    let categories = req.body.categories;
    let result = await createBlog(authorID , title , content , categories);
    return res.json("done")
})

//update blog
router.post('/editBlog', async(req, res)=>{
    let result = await updateTitleAndContent(req.body.id , req.body.title , req.body.content);
    if(result === 'error') return res.json(new Error("Server error"));
    else return res.json("DONE");
})

//Publish and unpublish
router.get('/publishBlog' , async(req , res)=>{
    let id = req.query.id;
    let result = await Publish(id);
    return res.json(result);
})
router.get('/unPublishBlog' , async(req, res)=>{
    let id = req.query.id;
    let result = await UnPublish(id);
    return res.json(result);
})

//delete blogs
router.post('/deleteBlog' , async(req, res)=>{
    let id = req.body.id;
    let result = await deleteBlog(id);
    console.log(result);
    if(result === 'error') return res.json(new Error("Something went wrong!"));
    return res.json("DONE");
})

//Category adding and removing 
router.post('/removeCategory', async(req , res)=>{
    let id = req.body.id;
    let category = req.body.name;
    let result = await removeCategory(id , category);
    if(result === 'removed') return res.json("DONE");
    else res.json(new Error("Error"));
})
router.post('/addCategory', async(req , res)=>{
    let id = req.body.id;
    let category = req.body.name;
    let result = await addCategory(id , category);
    if(result !== 'error') return res.json("DONE");
    else res.json(new Error("Error"));
})
exports.blogRouter = router