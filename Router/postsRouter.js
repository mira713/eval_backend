const express = require('express');
const { PostModel} = require('../model/postModel');
const postsRouter = express.Router();

postsRouter.get('/',async(req,res)=>{
    try{
        let posts = await PostModel.find();
        res.send(posts)
    }catch(e){
        res.send(e.message)
    }
});

postsRouter.get('/top', async(req,res)=>{
    try{
        let post = await PostModel.find({no_if_comments});
        res.send(post)
    }catch(e){
        res.send(e.messagge)
    }
})

postsRouter.post('/create', async(req,res)=>{
    try{
        const posts = new PostModel(req.body);
        await posts.save();
        res.send(req.body);
    }catch(e){
        res.send(e.message)
    }
})

postsRouter.patch('/update/:id',async(req,res)=>{
    const id = req.params.id
    const payload = req.body;
    const post = await PostModel.findOne();
    const id_in_post = post.user;
    const id_of_user = req.body.user;

    try{
        if(id_in_post==id_of_user){
            await PostModel.findByIdAndUpdate({_id:id},payload);
        }else{
            res.send('could not find the posts')
        }
    }catch(e){
        res.send(e)
    }
    res.send('updated')
})

postsRouter.patch('/update/:id',async(req,res)=>{
    const id = req.params.id
    const post = await PostModel.findOne();
    const id_in_post = post.user;
    const id_of_user = req.body.user;

    try{
        if(id_in_post==id_of_user){
            await PostModel.findByIdAndDelete({_id:id});
        }else{
            res.send('could not find the posts')
        }
    }catch(e){
        res.send(e)
    }
    res.send('deleted')
})


module.exports={
    postsRouter
}