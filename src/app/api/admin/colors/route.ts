import connectDB from "@/app/config/connectDB";
import Colors from "@/app/models/colors";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { colors } = await req.json();
    const splitString = colors.split(",");
    const cleanedStrings = splitString.map((s: any) =>
      s
        .replace(/\s{2,}/g, " ")
        .trim()
        .toLowerCase()
    );

    const filterArray = cleanedStrings.filter((value: any) => value != "");
    let mySet = new Set(filterArray);
    let result = Array.from(mySet);

    let typeCheck: any = [];
    const type: any = await Colors.find();
    type.forEach((value: any) => {
      typeCheck.push(value.colors);
    });

    if (type) {
      const filterSubCategories = typeCheck.filter((value: any) =>
        result.includes(value)
      );
      if (filterSubCategories.length > 0) {
        return NextResponse.json({
          message: "Color is Exist",
          status: 400,
        });
      }
    }

    await result.map(async (value: any) => {
      return await new Colors({
        colors: value,
      }).save();
    });

    return NextResponse.json({
      message: "Add Color Successfully",
      status: 200,
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
