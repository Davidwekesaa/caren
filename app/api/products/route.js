import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import Product from "@/app/backend/Models/Product";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await dbConnect();
    const getAllProducts = await Product.find();
    return NextResponse.json({ getAllProducts }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req, res) {
  try {
    await dbConnect();
    const newProduct = new Product(await req.json());
    const savedProduct = await newProduct.save();
    return NextResponse.json({ savedProduct }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
