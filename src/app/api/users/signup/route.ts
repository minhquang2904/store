import connectDB from "@/app/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/app/models/user";

async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { email, password } = await req.json();

    const user = await User.findOne({ email });
    if (user) {
      console.log(user);
      return NextResponse.json({ message: "User already exists", status: 400 });
    }
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();
    return NextResponse.json({
      message: "User signed up successfully!",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export { POST };
