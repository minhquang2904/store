import connectDB from "@/app/config/connectDB";
import User from "@/app/models/user";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());
    const { id, firstName, lastName, phone, city, district, ward, street } =
      data;
    const user = await User.findById(id);

    if (user) {
      const updateUser = await User.findByIdAndUpdate(id, {
        firstName,
        lastName,
        phone,
        address: {
          street,
          city,
          district,
          ward,
          addressFull: `${street}, ${ward}, ${district}, ${city}`,
        },
      });
      return NextResponse.json({
        message: "Update profile success!",
        status: 200,
      });
    }
    return NextResponse.json({
      message: "Update profile Failed!",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
