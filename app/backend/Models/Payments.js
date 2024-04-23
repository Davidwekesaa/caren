const mongoose = require('mongoose')

const PaymentsSchema = new mongoose.Schema({
    Phone:{
        type: String,
        required: true
    },
    Amount:{
        type: String,
        required: true
    },
    TransactionId:{
        type: String,
        required: true
    },
     
},
{ 
  timestamps: true,
})

module.exports = mongoose.model("Payments",PaymentsSchema)