import { dbConnect } from "@/app/backend/dbConnect/dbConnect";
import User from "@/app/backend/Models/User";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { createSession } from "@/app/backend/lib/session";
export async function POST(req, res) {
  try {
    await dbConnect();
    const {
      userName,
      userEmail,
      userPassword,
      // userIsAdmin,
      profile,
      // userRights,
    } = await req.json();
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userPassword, salt);
    const newUser = await User({
      userName: userName,
      userEmail: userEmail,
      password: hash,
      // isAdmin: userIsAdmin,
      profile: profile,
      // userRights: userRights,
    }).save();

    const jwts = {
      id: newUser._id,
      isAdmin: newUser.isAdmin,
      userRights: newUser.userRights,
    };

    // const token = jwt.sign(
    //   {
    //     id: newUser._id,
    //     isAdmin: newUser.isAdmin,
    //     userRights: newUser.userRights,
    //   },
    //   process.env.NEXT_PUBLIC_jwt_key
    // );
    // cookies().set("access_token", token, {
    //   httpOnly: true,
    //   secure: true,
    //   expires: expiresAt,
    //   sameSite: 'lax',
    //   path: "/",
    // });

    await createSession(jwts);

    const { password, isAdmin, ...other } = newUser._doc;
    console.log("registered ", other);
    return NextResponse.json({ other }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
