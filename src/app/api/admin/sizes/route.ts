import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import Size from "@/app/models/sizes";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { sizes } = await req.json();
    const splitString = sizes.split(",");
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
    const type: any = await Size.find();
    type.forEach((value: any) => {
      typeCheck.push(value.sizes);
    });

    if (type) {
      const filterSubCategories = typeCheck.filter((value: any) =>
        result.includes(value)
      );
      if (filterSubCategories.length > 0) {
        return NextResponse.json({
          message: "Size is Exist",
          status: 400,
        });
      }
    }

    await result.map(async (value: any) => {
      return await new Size({
        sizes: value,
      }).save();
    });

    return NextResponse.json({
      message: "Add Size Successfully",
      status: 200,
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
    const products = await Product.aggregate([
      { $unwind: "$sizes" },
      { $project: { sizes: "$sizes.size" } },
    ]);
    const sizes = await Size.findById(id, { sizes: 1, _id: 0 });

    for (const value of products) {
      if (value.sizes === sizes.sizes) {
        return NextResponse.json({
          message: `Delete Categories Failed, ${sizes.sizes} is used`,
          status: 400,
        });
      }
    }

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
