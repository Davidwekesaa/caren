import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import Category from "@/app/backend/Models/Category";
import { NextResponse } from "next/server";
export async function GET(req, res) {
  try {
    await dbConnect();
    const getAllCategory = await Category.find();
    return NextResponse.json({ getAllCategory }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(req, { params }) {
  try {
    dbConnect();
    const { name, imgSrc } = await req.json();
    console.log("img ", imgSrc);
    const newCar = {
      imgSrc: imgSrc,
      name: name,
    };

    const newCategory = new Category(newCar);
    const savedCategory = await newCategory.save();
    return NextResponse.json({ savedCategory }, { status: 200 });
  } catch (error) {
    console.log("category error ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
