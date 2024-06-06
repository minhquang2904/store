import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const {
      files,
      categories,
      sub_categories,
      sexs,
      name,
      description,
      subName,
      price,
      discount,
      discountedPrice,
      colors,
      quantity,
      size,
    } = await req.json();

    const nameToLowerCase = name.toLowerCase().trim();
    const productExist = await Product.findOne({
      name: nameToLowerCase,
    });

    if (productExist) {
      return NextResponse.json({
        message: "Product already exist - name must be unique",
        status: 400,
      });
    }

    const descriptionToLowerCase = description.toLowerCase().trim();
    const subNameToLowerCase = subName.toLowerCase().trim();
    const colorsString = JSON.stringify(colors);
    const sizeString = JSON.stringify(size);
    const newArrFile: any = [];
    const fileFilter = files.forEach((file: any) => {
      newArrFile.push(file.data);
    });

    const product = await new Product({
      files: newArrFile,
      name: nameToLowerCase,
      subName: subNameToLowerCase,
      description: descriptionToLowerCase,
      categories,
      sub_categories,
      sexs,
      price,
      discount,
      discountedPrice,
      colors: colorsString,
      quantity,
      size: sizeString,
    }).save();

    return NextResponse.json({
      message: "Add Product Successfully",
      status: 200,
      data: product,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const products = await Product.find();
    if (products) {
      return NextResponse.json({
        message: "Get product Successfully",
        status: 200,
        data: products,
      });
    }
    return NextResponse.json({
      message: "Get product Failed",
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
    console.log(id);
    // if (product) {
    //   return NextResponse.json({
    //     message: "Delete product Successfully",
    //     status: 200,
    //     data: product,
    //   });
    // }
    return NextResponse.json({
      message: "Delete product Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
