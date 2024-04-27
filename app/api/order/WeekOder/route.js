import Orders from "@/app/backend/Models/Orders";
import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    dbConnect();
    // // get the start and end of the past week
    const today = new Date();
    const oneWeekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);

    // // find orders placed in the past week
    const orders = await Orders.find({
      createdAt: {
        $gte: oneWeekAgo,
        $lt: today,
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
