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
    if (data?.code == "ERR_JWS_SIGNATURE_VERIFICATION_FAILED") {
      return NextResponse.json({
        message: "Verify token Failed!",
        status: 400,
      });
    }
    const admin = await Admin.findById(data.payload.id);
    if (admin) {
      return NextResponse.json({
        message: "Verify token Success!",
        status: 200,
        payload: data.payload,
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
