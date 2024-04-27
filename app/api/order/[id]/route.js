import Orders from "@/app/backend/Models/Orders";
import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import { NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

export async function PUT(req, { params }) {
  try {
    dbConnect();
    const { id } = params;
    const UpdatedOrders = await Orders.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );

    return NextResponse.json({ UpdatedOrders }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    dbConnect();
    const { id } = params;
    await Orders.findByIdAndDelete(id);

    return NextResponse.json(
      { message: "the collection has been deleted" },
      { status: 200 }
    );
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
    const { id } = params;
    const Orderss = await Orders.findById(id);

    return NextResponse.json({ Orderss }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
