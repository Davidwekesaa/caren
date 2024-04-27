import Orders from "@/app/backend/Models/Orders";
import Product from "@/app/backend/Models/Product";
import UserOrders from "@/app/backend/Models/UserOrders";
import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import { NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

export async function POST(req, { params }) {
  try {
    dbConnect();
    const today = new Date();
    const lastMonth = today.getMonth() === 0 ? 11 : today.getMonth() - 1; // handle January edge case
    const oneMonthAgo = new Date(today.getFullYear(), lastMonth, 1);
    const endOfLastMonth = new Date(today.getFullYear(), lastMonth + 1, 0);

    // find orders placed in the past month
    const orders = await Orders.find({
      createdAt: {
        $gte: oneMonthAgo,
        $lt: endOfLastMonth,
      },
    }).exec();

    if (!orders || orders.length === 0) {
      return NextResponse.json({ error: "No Data" }, { status: 500 });
    }

    return NextResponse.json({ orders }, { status: 200 });
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
