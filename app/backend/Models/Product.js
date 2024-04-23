const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    itemId:{
        type: String,
        required: true
    },
    imgSrc:{
        type: String,
        required: true
    },
    // photos:{
    //     type: [String]
    // },
    price:{
        type: Number,
        required: true
    },
    // rating:{
    //     type: Number,
    //     min:0,
    //     max:5
    // },
    // Category:{
    //     type: [String],
        
    // },
    // cheapestPrice:{
    //     type: Number,
    //     required: true
    // },
    capacity:{
        type: String,
        required: true
    },
    kgs:{
        type: String,
        required: true
    },
    qty:{
        type: Number,
        required: true
    },
},
{ 
  timestamps: true,
})

module.exports = mongoose.model("Product",ProductSchema)