import Orders from "@/app/backend/Models/Orders";
import Product from "@/app/backend/Models/Product";
import UserOrders from "@/app/backend/Models/UserOrders";
import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import { NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

export async function GET(req) {
  try {
    dbConnect();
    const orderss = await Orders.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          Total: { $sum: "$total" },
        },
      },
    ]);

    const ordersByMonthWithNames = orderss.map((order) => {
      const monthName = new Date(0, order._id - 1).toLocaleString("en-US", {
        month: "long",
      });
      return { name: monthName, Total: order.Total };
    });

    return NextResponse.json({ ordersByMonthWithNames }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
