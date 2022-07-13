import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import User  from "./User.js";
/*  */
import dotenv from "dotenv";
dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000

app.get('/',(req,res) => res.send('hello from server'))

app.get('/users', async (req,res)=>{
    const users = await User.find({})
    res.status(200).json(users)
})
const addUser = async (req,res) => {
    const {name,Email} = req.body;
    const user = new User({name,Email});
    try {
        await user.save((err,user) => {
            if (err) {
                res.status(400).json({message: "error"})
            } else {
                console.log("success from post")
                res.status(200).json(
                    {
                        message: "success",
                        data: user
                    }
                )
            }
        })
    } catch (Error) {
        console.log(Error)
    }
}
app.post('/users',addUser)



app.listen (PORT, () =>console.log(`server is working on port ${PORT}`))

const DB_url = process.env.MONGO_URL;
 
mongoose
.connect(DB_url,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB working'))
.catch((Error)=>console.log(Error))





