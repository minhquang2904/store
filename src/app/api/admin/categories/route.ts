import connectDB from "@/app/config/connectDB";
import Categories from "@/app/models/categories";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { categories } = await req.json();
    const categoriesToLowerCase = categories.toLowerCase();
    const type: any = await Categories.findOne({
      categories: categoriesToLowerCase,
    });

    if (type) {
      return NextResponse.json({
        message: "Categories is Exist",
        status: 400,
      });
    }

    const newCategories = await new Categories({
      categories: categoriesToLowerCase,
    }).save();

    return NextResponse.json({
      message: "Add Categories Successfully",
      status: 200,
      newCategories: newCategories.categories,
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
