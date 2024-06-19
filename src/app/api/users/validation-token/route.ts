import connectDB from "@/app/config/connectDB";
import User from "@/app/models/user";
import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";

export async function GET(req: NextRequest) {
  await connectDB();
  const cookieStore = cookies();
  try {
    const token = cookieStore.get(process.env.LOGIN_INFO_USER!);
    const { value }: any = token;
    const decode: any = await verifyToken(value);
    const data = await decode?.payload;
    const user = await User.findById(data.id);
    // console.log("data", decode);
    // console.log("exp", new Date(decode.payload.exp * 1000).toString());
    // console.log("iat", new Date(decode.payload.iat * 1000).toString());
    if (user) {
      return NextResponse.json({
        message: "Authenticated successfully!",
        status: 200,
        data: {
          id: user._id,
        },
      });
    }
    if (decode?.code == "ERR_JWS_SIGNATURE_VERIFICATION_FAILED") {
      return NextResponse.json({
        message: "Authenticated Failed!",
        status: 400,
      });
    }
    return NextResponse.json({
      message: "Authenticated Failed!",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
