const mongoose = require("mongoose");

const OrdersSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  imgSrc: {
    type: String,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  qty: {
    type: Number,
    required: true,
  },
  capacity: {
    type: String,
    required: true,
  },
  kgs: {
    type: String,
    required: true,
  },
},
{ 
  timestamps: true,
});

module.exports = mongoose.model("Orders", OrdersSchema);
