const express = require('express');
require('dotenv').config();
const {connection}= require('./config/db')
const {userRouter} = require('./Router/userRouter')
const {postsRouter} = require('./Router/postsRouter');
const {authenticate} = require('./middleware/authenticate');
const cors = require('cors');
const app = express();



app.use(express.json())
app.use(cors({
    origin:"*"
}))
app.get('/',(req,res)=>{
    res.send('welcome to linkein')
});

app.use('/users',userRouter)
app.use(authenticate);
app.use("/posts",postsRouter)

let port = process.env.port

app.listen(port,async()=>{
    await connection
    console.log(`port running on ${port}`)
    console.log('connected to db')
})