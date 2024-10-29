import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifyToken } from "./app/lib/jwt";

const protectedRoutes = ["/cart", "/like", "/profile"];
const loginRoutes = ["/login", "/signup"];

export default async function middleware(req: any) {
  const { pathname } = req.nextUrl;

  const cookieStore = cookies();
  const accessTokenUser: any = cookieStore.get(process.env.LOGIN_INFO_USER!);
  const accessTokenAdmin: any = cookieStore.get("LOGIN-INFO-ADMIN");

  if (accessTokenUser) {
    const checkToken: any = await verifyToken(accessTokenUser.value);
    const error: any = checkToken.code;
    if (
      (error == "ERR_JWS_INVALID" ||
        error == "ERR_JWS_SIGNATURE_VERIFICATION_FAILED" ||
        error == "ERR_JWT_EXPIRED") &&
      protectedRoutes.includes(pathname)
    ) {
      const absoluteURL = new URL("/login", req.nextUrl.origin);
      const response = NextResponse.redirect(absoluteURL.toString());
      response.cookies.delete("LOGIN-INFO-USER");
      return response;
    }
    if (error != "ERR_JWS_INVALID" && loginRoutes.includes(pathname)) {
      const absoluteURL = new URL("/", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  } else {
    if (!accessTokenUser && protectedRoutes.includes(pathname)) {
      const absoluteURL = new URL("/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  if (accessTokenAdmin) {
    const checkToken: any = await verifyToken(accessTokenAdmin.value);
    const error: any = checkToken.code;
    if (
      (error == "ERR_JWS_INVALID" ||
        error == "ERR_JWS_SIGNATURE_VERIFICATION_FAILED" ||
        error == "ERR_JWT_EXPIRED") &&
      pathname.startsWith("/admin") &&
      pathname != "/admin/login"
    ) {
      const absoluteURL = new URL("/admin/login", req.nextUrl.origin);
      const response = NextResponse.redirect(absoluteURL.toString());
      response.cookies.delete("LOGIN-INFO-ADMIN");
      return response;
    }
    if (error != "ERR_JWS_INVALID" && pathname == "/admin/login") {
      const absoluteURL = new URL("/admin", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  } else {
    if (pathname.startsWith("/admin") && pathname != "/admin/login") {
      const absoluteURL = new URL("/admin/login", req.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }
}
