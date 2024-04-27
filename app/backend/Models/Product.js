const mongoose = require("mongoose");

let Product;
if (mongoose.models.Product) {
  Product = mongoose.model("Product");
} else {
  const ProductSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },

      itemId: {
        type: String,
        required: true,
      },
      imgSrc: {
        type: String,
        required: true,
      },
      // photos:{
      //     type: [String]
      // },
      price: {
        type: Number,
        required: true,
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
      capacity: {
        type: String,
        required: true,
      },
      kgs: {
        type: String,
        required: true,
      },
      qty: {
        type: Number,
        required: true,
      },
    },
    {
      timestamps: true,
    }
  );

  Product = mongoose.model("Product", ProductSchema);
}

export default Product;
