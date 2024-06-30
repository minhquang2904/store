import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import Sex from "@/app/models/sexs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { sexs } = await req.json();
    const splitString = sexs.split(",");
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
    const type: any = await Sex.find();
    type.forEach((value: any) => {
      typeCheck.push(value.sexs);
    });

    if (type) {
      const filterType = typeCheck.filter((value: any) =>
        result.includes(value)
      );
      if (filterType.length > 0) {
        return NextResponse.json({
          message: "Sex is Exist",
          status: 400,
        });
      }
    }

    await result.map(async (value: any) => {
      return await new Sex({
        sexs: value,
      }).save();
    });

    return NextResponse.json({
      message: "Add Sex Successfully",
      status: 200,
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
    const products = await Product.find({}, { sexs: 1, _id: 0 });
    const sexs = await Sex.findById(id, { sexs: 1, _id: 0 });

    for (const value of products) {
      if (value.sexs === sexs.sexs) {
        return NextResponse.json({
          message: `Delete Categories Failed, ${sexs.sexs} is used`,
          status: 400,
        });
      }
    }

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
