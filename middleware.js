import "server-only";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
const secretKey = process.env.NEXT_PUBLIC_jwt_key;
const encodedKey = new TextEncoder().encode(secretKey);

export async function middleware(request) {
  // const sessions = cookies(request).get("session")?.value;
  // console.log("middleware ", sessions);
  // if (!sessions) {
  //   return NextResponse.redirect(new URL("/auth/login", request.url));
  // }
  // async function decrypt(session) {
  //   try {
  //     const { payload } = await jwtVerify(session, encodedKey, {
  //       algorithms: ["HS256"],
  //     });
  //     return payload;
  //   } catch (error) {
  //     return null;
  //   }
  // }
  // decrypt(sessions).then((payload) => {
  //   if (payload) {
  //     console.log("Session is valid.");
  //     console.log("Payload:", payload?.userId?.userRights);
  //     if (payload?.userId?.isAdmin && payload?.userId?.userRights > 0) {
  //       return NextResponse.redirect(new URL("/dashboard", request.url));
  //     } else {
  //       return NextResponse.redirect(new URL("/auth/login", request.url));
  //     }
  //   } else {
  //     console.log("Session is not valid.");
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }
  // });
}

export const config = {
  matcher: "/dashboard/:path*",
};
