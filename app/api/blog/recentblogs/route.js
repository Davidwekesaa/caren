import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import BlogsModel from "@/app/backend/Models/Blog";
import { NextResponse } from "next/server";
import url from "url";
export async function GET(req, res) {
  try {
    await dbConnect();
    const getAllBlogs = await BlogsModel.aggregate([
      { $sort: { timestamp: -1 } },
      { $limit: 5 },
    ]);
    return NextResponse.json({ getAllBlogs }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
