import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import User from "@/app/backend/Models/User";
import { NextResponse } from "next/server";
import url from "url";
import bcrypt from "bcryptjs";
export async function GET(req, res) {
  try {
    await dbConnect();
    const getAllUsers = await User.find();
    // console.log("users ", getAllUsers);
    return NextResponse.json({ getAllUsers }, { status: 200 });
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
    const { userName, userEmail, isAdmin, profile, userRights, password } =
      await req.json();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    const newUser = await User({
      userName: userName,
      userEmail: userEmail,
      password: hash,
      isAdmin: isAdmin,
      profile: profile,
      userRights: userRights,
    }).save();
    console.log("new user ", newUser);
    return NextResponse.json({ newUser }, { status: 200 });
  } catch (error) {
    console.log("errorr ", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
