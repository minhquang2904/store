import connectDB from "@/app/config/connectDB";
import Colors from "@/app/models/colors";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { colors } = await req.json();
    const colorToLowerCase = colors.toLowerCase();
    const type: any = await Colors.findOne({
      colors: colorToLowerCase,
    });

    if (type) {
      return NextResponse.json({
        message: "Color is Exist",
        status: 400,
      });
    }

    const newColor = await new Colors({
      colors: colorToLowerCase,
    }).save();

    return NextResponse.json({
      message: "Add Color Successfully",
      status: 200,
      newColor: newColor.colors,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const data: any = await Colors.find();
    if (data) {
      return NextResponse.json({
        message: "Get Color Successfully",
        status: 200,
        data: data,
      });
    }
    return NextResponse.json({
      message: "Get Color Failed",
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
    const data: any = await Colors.findByIdAndDelete(id);

    if (data) {
      return NextResponse.json({
        message: "Delete Color Successfully",
        status: 200,
      });
    }
    return NextResponse.json({
      message: "Delete Sex Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
