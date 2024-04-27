import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import Product from "@/app/backend/Models/Product";
import { NextResponse } from "next/server";

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const UpdatedProduct = await Product.findByIdAndUpdate(
      id,
      { $set: await req.json() },
      { new: true }
    );

    return NextResponse.json({ UpdatedProduct }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, { params }) {
  try {
    const { id } = params;
    await Product.findByIdAndDelete(id);

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
    const { id } = params;
    const Products = await Product.findById(id);

    return NextResponse.json({ Products }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
