const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    
    userEmail:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    profile:{
        type: String,
        required: true
    },
    isAdmin:{
        type: Boolean,
       default:false

    },
    userRights:{
        type: Number,
       default:0

    },
},
{ 
  timestamps: true,
})

module.exports = mongoose.model("User",userSchema)