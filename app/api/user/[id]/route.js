import User from "@/app/backend/Models/User";
import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import { NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

export async function DELETE(req, { params }) {
  try {
    dbConnect();
    const { id } = params;
    await User.findByIdAndDelete(id);

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
