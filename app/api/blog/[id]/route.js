import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import BlogsModel from "@/app/backend/Models/Blog";
import { NextResponse } from "next/server";
import url from "url";
export async function GET(req, { params }) {
  try {
    const { id } = params;
    console.log("id", id);
    await dbConnect();
    function isValidObjectId(pgkg) {
      // Regular expression to match a 24-character hexadecimal string
      const objectIdRegex = /^[0-9a-fA-F]{24}$/;
      return objectIdRegex.test(pgkg);
    }
    let Blogs;
    if (isValidObjectId(id)) {
      Blogs = await BlogsModel.findById(id);
    } else {
      Blogs = await BlogsModel.find({ blogHeading: id });
    }
    return NextResponse.json({ Blogs }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
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
    await BlogsModel.findByIdAndDelete(id);

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

export async function PUT(req, { params }) {
  try {
    dbConnect();
    const { id } = params;
    const blgs = await BlogsModel.findByIdAndUpdate(
      id,
      { $set: await req.json() },
      { new: true }
    );

    return NextResponse.json({ blgs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
