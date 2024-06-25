import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    cookies().delete(process.env.LOGIN_INFO_ADMIN!);
    return NextResponse.json({
      message: "Logout successfully!",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
