import connectDB from "@/app/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Admin from "@/app/models/admin";
import { signToken } from "@/app/lib/jwt";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(
      process.env.ADMIN_PASSWORD!,
      salt
    );

    await new Admin({
      username: "admin",
      password: hashedPassword,
      role: "admin",
    }).save();

    const { username, password } = await req.json();
    const usernameToLowerCase = username.toLowerCase();
    const admin = await Admin.findOne({ username: usernameToLowerCase });

    if (admin) {
      const isMatch = await bcryptjs.compare(password, admin.password);
      if (isMatch) {
        const id = admin._id;
        const role = admin.role;

        const token = await signToken({
          id,
          username: usernameToLowerCase,
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
