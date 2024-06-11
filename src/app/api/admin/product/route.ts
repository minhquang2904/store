import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import { writeFile } from "fs/promises";
<<<<<<< HEAD

import { UploadImage } from "@/app/lib/upload-image";
=======
import path from "path";
>>>>>>> parent of aba1247 (fix image)

const uploadDir = path.join(process.cwd(), "public", "uploads/products");

export async function PUT(req: any) {
  await connectDB();

  try {
    const data = await req.formData();
    const files = data.getAll("files");
    const id = data.get("id");
    console.log(files);
    const product = await Product.findById(id);

    if (product) {
      const name = data.get("name");
      const subName = data.get("subName");
      const description = data.get("description");
      const categories = data.get("categories");
      const sub_categories = data.get("sub_categories");
      const sexs = data.get("sexs");
      const price = data.get("price");
      const discount = data.get("discount");
      const discountedPrice = data.get("discountedPrice");
      const colors = data.get("colors");
      const quantity = data.get("quantity");
      const size = data.get("size");

      let newArrFileOld: any = [...product.files];
      let newArrFilesString: any = [];
      let newArrFilesObject: any = [];

      files.forEach((file: any) => {
        if (typeof file === "string") {
          newArrFilesString.push(file);
        } else {
          newArrFilesObject.push(file);
        }
      });

      let newArrFileSave: any = [];
      let newArrFileDelete: any = [];

      if (newArrFilesString.length > 0) {
        newArrFileOld.filter((file: any) => {
          if (newArrFilesString.includes(file)) {
            newArrFileSave.push(file);
          } else {
            newArrFileDelete.push(file);
          }
        });
      } else {
        newArrFileDelete.push(...newArrFileOld);
      }

      if (newArrFileDelete.length > 0) {
        for (const file of newArrFileDelete) {
          const filePath = `${uploadDir}/${file}`;
          try {
            await fs.unlink(filePath);
          } catch (error: any) {
            return NextResponse.json({
              message: `Error deleting file: ${error.message}`,
              status: 500,
            });
          }
        }
      }

      if (newArrFilesObject.length > 0) {
        for (const file of newArrFilesObject) {
          const uniqueSuffix =
            Date.now() + "-" + Math.round(Math.random() * 1e9);
          const newFileName = `${uniqueSuffix}-${file.name}`;
          const newFilePath = `${uploadDir}/${newFileName}`;
          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);
          newArrFileSave.push(newFileName);
          try {
            await writeFile(newFilePath, buffer);
          } catch (error: any) {
            return NextResponse.json({
              message: `Error saving file: ${error.message}`,
              status: 500,
            });
          }
        }
      }

      await Product.findByIdAndUpdate(id, {
        files: newArrFileSave,
        name: name,
        subName: subName,
        description: description,
        categories: categories,
        sub_categories: sub_categories,
        sexs: sexs,
        price: price,
        discount: discount,
        discountedPrice: discountedPrice,
        colors: colors,
        quantity: quantity,
        size: size,
      });

      return NextResponse.json({
        message: "Update Product Successfully",
        status: 200,
      });
    }

    return NextResponse.json({
      message: "Update Product Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function POST(req: any) {
  await connectDB();
  await fs.mkdir(uploadDir, { recursive: true });
  try {
    const data = await req.formData();
    const name = data.get("name");
    const subName = data.get("subName");
    const description = data.get("description");
    const categories = data.get("categories");
    const sub_categories = data.get("sub_categories");
    const sexs = data.get("sexs");
    const price = data.get("price");
    const discount = data.get("discount");
    const discountedPrice = data.get("discountedPrice");
    const colors = data.get("colors");
    const quantity = data.get("quantity");
    const size = data.get("size");
    const files = data.getAll("files");

    let newArrFile: any = [];
    for (const file of files) {
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const newFileName = `${uniqueSuffix}-${file.name}`;
      const newFilePath = `${uploadDir}/${newFileName}`;
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      newArrFile.push(newFileName);
      try {
        await writeFile(newFilePath, buffer);
      } catch (error: any) {
        return NextResponse.json({
          message: `Error saving file: ${error.message}`,
          status: 500,
        });
      }
    }

    await new Product({
      files: newArrFile,
      name,
      subName,
      description,
      categories,
      sub_categories,
      sexs,
      price,
      discount,
      discountedPrice,
      colors,
      quantity,
      size,
    }).save();

    return NextResponse.json({
      message: "Add Product Successfully",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const searchParams = req.nextUrl.searchParams;
    const id = searchParams.get("id");

    if (id) {
      const productId = await Product.findById(id);
      if (productId) {
        return NextResponse.json({
          message: "Get product Successfully",
          status: 200,
          products: productId,
        });
      } else {
        return NextResponse.json({
          message: "Get product Failed",
          status: 400,
        });
      }
    }

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
    const product = await Product.findById(id);

    if (product) {
      for (const file of product.files) {
        const filePath = `${uploadDir}/${file}`;
        try {
          await fs.unlink(filePath);
        } catch (error: any) {
          return NextResponse.json({
            message: `Error deleting file: ${error.message}`,
            status: 500,
          });
        }
      }
      await Product.findByIdAndDelete(id);

      return NextResponse.json({
        message: "Delete product Successfully",
        status: 200,
      });
    }
    return NextResponse.json({
      message: "Delete product Failed",
      status: 400,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
