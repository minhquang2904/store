import connectDB from "@/app/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/app/models/user";
import { signToken } from "@/app/lib/jwt";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email, password } = await req.json();
    const emailToLowerCase = email.toLowerCase();
    const user = await User.findOne({ email: emailToLowerCase });
    if (user) {
      const isMatch = await bcryptjs.compare(password, user.password);
      if (isMatch) {
        const id = user._id;
        const role = user.role;
        const token = await signToken({
          id,
          email: emailToLowerCase,
          role,
        });
        return NextResponse.json({
          message: "Login Success!",
          status: 200,
          token: token,
        });
      }
      return NextResponse.json({ message: "Login Failed", status: 400 });
    }
    return NextResponse.json({ message: "Login Failed", status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
