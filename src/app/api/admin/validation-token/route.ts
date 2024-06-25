import connectDB from "@/app/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/jwt";
import Admin from "@/app/models/admin";
import { cookies } from "next/headers";
export const revalidate = 0;

export async function GET() {
  await connectDB();
  const cookieStore = cookies();
  try {
    const token = cookieStore.get(process.env.LOGIN_INFO_ADMIN!);
    if (!token) {
      return NextResponse.json({
        message: "Unauthorized Failed!",
        status: 401,
      });
    }
    const { value }: any = token;
    if (!value) {
      cookies().delete(process.env.LOGIN_INFO_USER!);
      return NextResponse.json({
        message: "Authenticated Failed!",
        status: 400,
      });
    }
    const decode: any = await verifyToken(value);
    const data = await decode?.payload;
    const admin = await Admin.findById(data.id);
    // console.log("data", data);
    // console.log("exp", new Date(data.exp * 1000).toString());
    // console.log("iat", new Date(data.iat * 1000).toString());
    if (admin && admin.role === "admin") {
      return NextResponse.json({
        message: "Verify token Success!",
        status: 200,
        data: {
          id: admin.id,
          username: admin.username,
          role: admin.role,
        },
      });
    }
    if (data?.code == "ERR_JWS_SIGNATURE_VERIFICATION_FAILED") {
      return NextResponse.json({
        message: "Verify token Failed!",
        status: 400,
      });
    }
    return NextResponse.json({
      message: "Verify token Failed!",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
