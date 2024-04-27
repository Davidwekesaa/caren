import UserOrders from "@/app/backend/Models/UserOrders";
import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import { NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

export async function PUT(req, { params }) {
  try {
    dbConnect();
    const { id } = params;
    const { status } = await req.json();

    const UpdatedUserOrders = await UserOrders.findByIdAndUpdate(
      id,
      { status: status },
      { new: true }
    );
    console.log("sdkhdfsdkdfhkjsd ", UpdatedUserOrders);
    return NextResponse.json({ UpdatedUserOrders }, { status: 200 });
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
    await UserOrders.findByIdAndDelete(id);

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

// export async function GET(req, { params }) {
//   try {
//     dbConnect();
//     const { id } = params;
//     const Orderss = await Orders.findById(id);

//     return NextResponse.json({ Orderss }, { status: 200 });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
