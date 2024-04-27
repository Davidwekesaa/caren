import Orders from "@/app/backend/Models/Orders";
import Product from "@/app/backend/Models/Product";
import UserOrders from "@/app/backend/Models/UserOrders";
import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import { NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

export async function GET(req) {
  try {
    dbConnect();
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0); // set to midnight
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999); // set to just before midnight

    // find orders placed today
    const orders = await Orders.find({
      createdAt: {
        $gte: startOfDay,
        $lt: endOfDay,
      },
    }).exec();

    if (!orders || orders.length === 0) {
      return NextResponse.json({ error: "No Data" }, { status: 500 });
    }

    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.log("error ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
