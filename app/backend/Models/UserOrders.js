const mongoose = require("mongoose");

const UserOrdersSchema = new mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },

    userEmailOrder: {
      type: String,
      required: true,
      unique: false,
    },
    userProfile: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: false,
    },
    address: {
      type: String,
      required: true,
    },
    orders: {
      type: [String],
    },
    status: {
      type: String,
      required: true,
    },
    total: {
      type: String,
      required: true,
    },
    payment: {
      type: String,
      require: true,
    },
    transactionId: {
      type: String,
      require: true,
    },
    OrderFor: {
      type: String,
    },
    delivery: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("UserOrders", UserOrdersSchema);
