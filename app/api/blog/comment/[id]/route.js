import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import BlogsModel from "@/app/backend/Models/Blog";
import { formatServerDate } from "@/app/utils/Utils";
import { NextResponse } from "next/server";
const { v4: uuidv4 } = require("uuid");

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    console.log("idd", params);
    const { name, userComment, parentId } = await req.json();
    await dbConnect();
    const comment = {
      commentId: uuidv4(),
      name: name,
      parentId: parentId ? parentId : null,
      comment: userComment,
      commentDAte: formatServerDate(),
    };

    console.log("comment ", comment);
    const UpdatedBlogComment = await BlogsModel.findByIdAndUpdate(
      id,
      { $push: { blogComments: comment } },
      { new: true }
    );
    console.log("UpdatedBlogComment ", UpdatedBlogComment);

    return NextResponse.json({ UpdatedBlogComment }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
