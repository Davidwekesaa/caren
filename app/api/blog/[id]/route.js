import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import BlogsModel from "@/app/backend/Models/Blog";
import { NextResponse } from "next/server";
import url from "url";
export async function GET(req, { params }) {
  try {
    const { id } = params;
    console.log("id", id);
    await dbConnect();
    const Blogs = await BlogsModel.find({ blogHeading: id });
    return NextResponse.json({ Blogs }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
