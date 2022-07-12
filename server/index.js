import express from "express";
import cors from "cors"
import mongoose from "mongoose";
import User  from "./User.js";
import dotenv from "dotenv";
dotenv.config();

const app = express()
app.use(express.json())
app.use(cors())

const PORT = process.env.PORT || 8000

app.get('/',(req,res) => res.send('hello from server'))

app.get('/users', async (req,res)=>{
    const users = await User.find({})
    console.log(users)
    res.status(200).json(users)
})


app.listen (PORT, () =>console.log("server is working on port 5000"))

const DB_url = process.env.MONGO_URL;
 
mongoose
.connect(DB_url,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB working'))
.catch((Error)=>console.log(Error))

const addUser = async () => {
    const user = new User({ name: 'joshwa', Email: 'juttjoshwa@gmail.com' })
    try {
        await user.save()
        console.log(user)
    } catch (Error) {
        console.log(Error)
    }
}

console.log(PORT)

