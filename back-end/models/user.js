const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
   
    email: {
        type:String,
        trim:true,
        unique: 1 
    },
    password: {
        type: String,
        minlength: 5
    }
})


const User = mongoose.model('User', userSchema)

module.exports =  User ;