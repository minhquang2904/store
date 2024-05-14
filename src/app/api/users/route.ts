import connectDB from "@/app/config/connectDB";
import Users from "@/app/models/Users";
import { NextResponse } from "next/server";

const GET = async () => {
  // await connectDB();
  // try {
  //   const users = await Users.find({});
  //   return NextResponse.json({ users });
  // } catch (err: any) {
  //   return NextResponse.json({ error: err.message });
  // }
};

export { GET };
