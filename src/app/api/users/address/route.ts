import connectDB from "@/app/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import User from "@/app/models/user";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const formData = await req.formData();
    const { id, firstName, lastName, phone, city, district, ward, street } =
      Object.fromEntries(formData.entries());

    const user = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          delivery_list: {
            firstName,
            lastName,
            phone,
            city,
            district,
            ward,
            street,
            addressFull: `${street}, ${ward}, ${district}, ${city}`,
          },
        },
      },
      { new: true }
    );

    if (!user) {
      return NextResponse.json({ message: "User not found", status: 404 });
    }

    return NextResponse.json({ message: "Add address success", status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
