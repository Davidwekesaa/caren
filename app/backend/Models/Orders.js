const mongoose = require("mongoose");

let Orders;
if (mongoose.models.Orders) {
  Orders = mongoose.model("Orders");
} else {
  const OrdersSchema = new mongoose.Schema(
    {
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
    }
  );

  Orders = mongoose.model("Orders", OrdersSchema);
}
export default Orders;
