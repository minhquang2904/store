import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = [
  "/cart",
  "/payment",
  "/address",
  "/like",
  "/profile",
  "/reviewOrder",
];

const loginRoutes = ["/login", "/signup"];

export default function middleware(req: any) {
  const cookieStore = cookies();
  const accessToken = cookieStore.get("access-token");
  if (!accessToken && protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/login", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (accessToken && loginRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
}
