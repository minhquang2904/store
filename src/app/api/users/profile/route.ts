import connectDB from "@/app/config/connectDB";
import { DeleteImage, UploadImage } from "@/app/lib/upload-image";
import User from "@/app/models/user";
import { NextResponse, NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  await connectDB();

  try {
    const formData = await req.formData();
    const data = Object.fromEntries(formData.entries());
    const {
      id,
      firstName,
      lastName,
      phone,
      city,
      district,
      ward,
      street,
      file,
    } = data as any;

    const user = await User.findById(id);

    if (user) {
      const uploadImageObj: any = [];
      if (
        typeof file === "string" &&
        file !== "undefined" &&
        user?.image[0]?.public_id
      ) {
        uploadImageObj.push(user?.image[0]);
      }
      if (typeof file === "object" && file !== "undefined") {
        try {
          const uploadImage: any = await UploadImage(file, "user", "avatar");
          uploadImageObj.push({
            url: uploadImage.secure_url,
            public_id: uploadImage.public_id,
            created_at: uploadImage.created_at,
            updated_at: uploadImage.created_at,
          });
        } catch (error: any) {
          return NextResponse.json({
            message: `Error saving file: ${error.message}`,
            status: 500,
          });
        }
      }
      if (
        typeof file === "object" &&
        file !== "undefined" &&
        user?.image[0]?.public_id
      ) {
        await DeleteImage(user?.image[0]?.public_id);
      }

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
        image: uploadImageObj,
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
