import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import User from "@/app/backend/Models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSession } from "@/app/backend/lib/session";

export async function POST(req, res) {
  try {
    await dbConnect();
    const { userEmail, userPassword } = await req.json();
    const checkUser = await User.findOne({ userEmail: userEmail });
    if (!checkUser)
      return NextResponse.json({ message: "create account" }, { status: 401 });

    const isPassword = await bcrypt.compare(userPassword, checkUser.password);
    if (!isPassword)
      return NextResponse.json(
        { message: "Wrong Email or Password!" },
        { status: 400 }
      );

    const token = {
      id: checkUser._id,
      isAdmin: checkUser.isAdmin,
      userRights: checkUser.userRights,
    };

    await createSession(token);
    const { password, isAdmin, ...other } = checkUser._doc;

    return NextResponse.json({ other }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
