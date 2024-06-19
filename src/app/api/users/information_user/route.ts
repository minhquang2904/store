import connectDB from "@/app/config/connectDB";
import User from "@/app/models/user";
import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();

  try {
    const { id } = await req.json();
    const user = await User.findById(id);

    if (user) {
      return NextResponse.json({
        message: "Get User Success!",
        status: 200,
        data: {
          email: user.email,
          lastName: user.lastName,
          firstName: user.firstName,
          phone: user.phone,
          address: user.address,
        },
      });
    }
    return NextResponse.json({ message: "Login Failed", status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
