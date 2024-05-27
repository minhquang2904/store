import connectDB from "@/app/config/connectDB";
import Size from "@/app/models/sizes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { sizes } = await req.json();
    const sizeToLowerCase = sizes.toLowerCase();
    const type: any = await Size.findOne({
      sizes: sizeToLowerCase,
    });

    if (type) {
      return NextResponse.json({
        message: "Size is Exist",
        status: 400,
      });
    }

    const newSize = await new Size({
      sizes: sizeToLowerCase,
    }).save();

    return NextResponse.json({
      message: "Add Size Successfully",
      status: 200,
      newSize: newSize.size,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const data: any = await Size.find();
    if (data) {
      return NextResponse.json({
        message: "Get Size Successfully",
        status: 200,
        data: data,
      });
    }
    return NextResponse.json({
      message: "Get Size Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");
    const data: any = await Size.findByIdAndDelete(id);

    if (data) {
      return NextResponse.json({
        message: "Delete Size Successfully",
        status: 200,
      });
    }
    return NextResponse.json({
      message: "Delete Size Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
