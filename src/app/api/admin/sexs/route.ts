import connectDB from "@/app/config/connectDB";
import Sex from "@/app/models/sexs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { sexs } = await req.json();
    const sexToLowerCase = sexs.toLowerCase();
    const type: any = await Sex.findOne({
      sexs: sexToLowerCase,
    });

    if (type) {
      return NextResponse.json({
        message: "Sex is Exist",
        status: 400,
      });
    }

    const newSex = await new Sex({
      sexs: sexToLowerCase,
    }).save();

    return NextResponse.json({
      message: "Add Sex Successfully",
      status: 200,
      newSex: newSex.sex,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const data: any = await Sex.find();
    if (data) {
      return NextResponse.json({
        message: "Get Sex Successfully",
        status: 200,
        data: data,
      });
    }
    return NextResponse.json({
      message: "Get Sex Failed",
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
    const data: any = await Sex.findByIdAndDelete(id);

    if (data) {
      return NextResponse.json({
        message: "Delete Sex Successfully",
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
