import Orders from "@/app/backend/Models/Orders";
import Product from "@/app/backend/Models/Product";
import UserOrders from "@/app/backend/Models/UserOrders";
import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import { NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

export async function POST(req, { params }) {
  try {
    dbConnect();
    const {
      userName,
      userEmail,
      phone,
      address,
      total,
      profile,
      payment,
      OrderFor,
      delivery,
      cart,
    } = await req.json();
    const userOder = {
      userName: userName,
      userEmailOrder: userEmail,
      phone: phone,
      address: address,
      status: "pending",
      total: total,
      userProfile: profile,
      payment: payment,
      OrderFor: OrderFor,
      delivery: delivery,
    };
    const newUserOrders = new UserOrders(userOder);
    await newUserOrders.save();

    const orderPromises = cart?.map(async (data) => {
      const OrderCart = {
        itemName: data.name,
        imgSrc: data.imgSrc,
        total: data.total,
        qty: data.qty,
        capacity: data.capacity,
        kgs: data.kgs,
      };
      const newOrders = new Orders(OrderCart);
      const ordersOrdered = await newOrders.save();

      const updatedUser = await UserOrders.findByIdAndUpdate(
        newUserOrders.id,
        { $push: { orders: ordersOrdered.id } },
        { new: true }
      );

      const pdata = await Product.findById(data.id);
      const quantyy = parseInt(pdata.qty) - parseInt(OrderCart.qty);
      const updatedProduct = await Product.findByIdAndUpdate(
        pdata._id,
        { qty: quantyy },
        { new: true }
      );

      return updatedProduct;
    });

    const updatedProducts = await Promise.all(orderPromises);

    console.log("product added ", updatedProducts);

    return NextResponse.json({ updatedProducts }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req, { params }) {
  try {
    dbConnect();
    const getAllOrderss = await Orders.find();
    const totalSum = getAllOrderss.reduce((sum, order) => {
      return sum + parseFloat(order.total);
    }, 0);

    return NextResponse.json(
      { orders: getAllOrderss, totalSum },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
