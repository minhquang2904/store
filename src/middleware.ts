import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./app/lib/jwt";

const protectedRoutes = [
  "/cart",
  "/payment",
  "/address",
  "/like",
  "/profile",
  "/reviewOrder",
];

const loginRoutes = ["/login", "/signup"];

export default async function middleware(req: any) {
  const cookieStore = cookies();
  const accessTokenUser: any = cookieStore.get("LOGIN-INFO-USER");
  if (accessTokenUser) {
    const checkToken = await verifyToken(accessTokenUser.value);
    if (!checkToken && protectedRoutes.includes(req.nextUrl.pathname)) {
      const absoluteURL = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
    if (checkToken && loginRoutes.includes(req.nextUrl.pathname)) {
      const absoluteURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}
