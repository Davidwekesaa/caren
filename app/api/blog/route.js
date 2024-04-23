import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import BlogsModel from "@/app/backend/Models/Blog";
import { NextResponse } from "next/server";
import url from "url";
export async function GET(req, res) {
  try {
    await dbConnect();
    const { query } = url.parse(req.url, true);
    const { p, limit } = query;

    console.log("q", limit);
    const blogCount = await BlogsModel.countDocuments();
    let page = parseInt(p) || 1;
    let childrenPerPage = parseInt(limit) || 3;
    let skip = (page - 1) * childrenPerPage;
    let numberOfPa = blogCount / childrenPerPage;
    let remainder = blogCount % childrenPerPage;
    let pk = remainder === 0 ? 0 : 1;
    let numberOfPages = parseInt(numberOfPa) + pk;
    const getAllBlogs = await BlogsModel.aggregate([
      {
        $skip: skip,
      },
      { $limit: childrenPerPage },
    ]);
    return NextResponse.json({ getAllBlogs, numberOfPages }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
