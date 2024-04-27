import Orders from "@/app/backend/Models/Orders";
import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import { NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

export async function POST(req) {
  try {
    dbConnect();
    const { orderIds } = await req.json();

    const orders = await Orders.find({
      _id: { $in: orderIds },
    });
    console.log("idss ", orders);
    return NextResponse.json({ orders }, { status: 200 });
  } catch (error) {
    console.log("errorr ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
