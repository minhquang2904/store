import connectDB from "@/app/config/connectDB";
import User from "@/app/models/user";
import { NextResponse, NextRequest } from "next/server";
import { verifyToken } from "@/app/lib/jwt";
import { cookies } from "next/headers";

export async function GET() {
  await connectDB();
  const cookieStore = cookies();
  try {
    const token = cookieStore.get(process.env.LOGIN_INFO_USER!);
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
    const user = await User.findById(data.id);
    // console.log("data", decode);
    // console.log("exp", new Date(decode.payload.exp * 1000).toString());
    // console.log("iat", new Date(decode.payload.iat * 1000).toString());
    if (!user) {
      cookies().delete(process.env.LOGIN_INFO_USER!);
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }
    if (user) {
      if (user.status === "active") {
        return NextResponse.json({
          message: "Authenticated successfully!",
          status: 200,
          data: {
            id: user._id,
            email: user.email,
            role: user.role,
            lastName: user.lastName,
            firstName: user.firstName,
            phone: user.phone,
            image: user.image,
            address: user.address,
            delivery_list: user.delivery_list,
          },
        });
      }
      cookies().delete(process.env.LOGIN_INFO_USER!);
      return NextResponse.json({
        message: "User is not active",
        status: 403,
      });
    }

    if (decode?.code == "ERR_JWS_SIGNATURE_VERIFICATION_FAILED") {
      cookies().delete(process.env.LOGIN_INFO_USER!);
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
    cookies().delete(process.env.LOGIN_INFO_USER!);
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
