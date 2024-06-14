import connectDB from "@/app/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/app/lib/jwt";
import Admin from "@/app/models/admin";
export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { token } = await req.json();
    const data: any = await verifyToken(token);
    const admin = await Admin.findById(data.payload.id);
    console.log("data", data);
    console.log("exp", new Date(data.payload.exp * 1000).toString());
    console.log("iat", new Date(data.payload.iat * 1000).toString());
    if (admin && admin.role === "admin") {
      return NextResponse.json({
        message: "Verify token Success!",
        status: 200,
        payload: data.payload,
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
