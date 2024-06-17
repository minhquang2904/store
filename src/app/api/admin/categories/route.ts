import connectDB from "@/app/config/connectDB";
import Categories from "@/app/models/categories";
import Product from "@/app/models/product";
import SubCategories from "@/app/models/sub_categories";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { categories } = await req.json();
    const splitString = categories.split(",");
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
    const type: any = await Categories.find();
    type.forEach((value: any) => {
      typeCheck.push(value.categories);
    });

    if (type) {
      const filterSubCategories = typeCheck.filter((value: any) =>
        result.includes(value)
      );

      if (filterSubCategories.length > 0) {
        return NextResponse.json({
          message: "Categories is Exist",
          status: 400,
          data: filterSubCategories,
        });
      }
    }

    await result.map(async (value: any) => {
      return await new Categories({
        categories: value,
      }).save();
    });

    return NextResponse.json({
      message: "Add Categories Successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const data: any = await Categories.find();
    if (data) {
      return NextResponse.json({
        message: "Get Categories Successfully",
        status: 200,
        data: data,
      });
    }
    return NextResponse.json({
      message: "Get Categories Failed",
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
    const products = await Product.find({}, { categories: 1, _id: 0 });
    const categories = await Categories.findById(id, { categories: 1, _id: 0 });

    for (const value of products) {
      if (value.categories === categories.categories) {
        return NextResponse.json({
          message: `Delete Categories Failed, ${categories.categories} is used`,
          status: 400,
        });
      }
    }

    await SubCategories.deleteOne({ categoryId: id });

    const data: any = await Categories.findByIdAndDelete(id);
    if (data) {
      return NextResponse.json({
        message: "Delete Categories Successfully",
        status: 200,
      });
    }
    return NextResponse.json({
      message: "Delete Categories Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
