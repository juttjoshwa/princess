import  mongoose  from "mongoose";

const USERschema = new mongoose.Schema({

    name :{
        type : String,
        require : true
    },
    Email : {
        type : String,
        require : true
    }
})

const User = mongoose.model('User', USERschema)
// console.log('hello')

export default User;