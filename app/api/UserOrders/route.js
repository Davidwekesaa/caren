import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import UserOrders from "@/app/backend/Models/UserOrders";
import { NextResponse } from "next/server";
import url from "url";
export async function GET(req, res) {
  try {
    await dbConnect();
    const getAllUserOrderss = await UserOrders.find();
    return NextResponse.json({ getAllUserOrderss }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
