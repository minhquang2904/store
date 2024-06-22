import connectDB from "@/app/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/app/models/user";
import { signToken } from "@/app/lib/jwt";
import { createCookie } from "@/app/lib/cookie";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email, password } = await req.json();
    const emailToLowerCase = email.toLowerCase();
    const user = await User.findOne({ email: emailToLowerCase });
    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password);
      if (isMatch) {
        if (user.status === "blocked") {
          return NextResponse.json({
            message: "User is not active",
            status: 403,
          });
        }
        const id = user._id;
        const role = user.role;

        await User.findByIdAndUpdate(id, {
          loginAt: new Date(),
        });

        const token = await signToken({
          id,
          email: emailToLowerCase,
          role,
        });

        const seralized = await createCookie(
          process.env.LOGIN_INFO_USER!,
          token
        );

        const response = {
          message: "Authenticated!",
          status: 200,
        };

        return new Response(JSON.stringify(response), {
          status: 200,
          headers: {
            "Set-Cookie": seralized,
          },
        });
      }
      return NextResponse.json({
        message: "Your account or password is incorrect",
        status: 400,
      });
    }
    return NextResponse.json({
      message: "Your account or password is incorrect",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
