import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";
import { DeleteImage, UploadImage } from "@/app/lib/upload-image";
import Inventories from "@/app/models/inventories";

export async function PUT(req: NextRequest) {
  await connectDB();

  try {
    const data = await req.formData();
    const id = data.get("id");
    const product = await Product.findById(id);

    if (product) {
      const files = data.getAll("files");
      const name = data.get("name");
      const subName = data.get("subName");
      const description = data.get("description");
      const categories = data.get("categories");
      const sub_categories = data.get("sub_categories");
      const sexs = data.get("sexs");
      const price = data.get("price");
      const discount = data.get("discount");
      const discountedPrice = data.get("discountedPrice");
      const colors: any = data.get("colors");
      const quantity = data.get("quantity");
      const size: any = data.get("size");
      const colorsParse = JSON.parse(colors);
      const sizeParse = JSON.parse(size);
      const existingSizes = [...product.sizes];

      const newArrSizeExist: any = [];
      const newArrSize: any = [];

      sizeParse.forEach((newSize: any) => {
        const exists = existingSizes.some((oldSize: any) => {
          return (
            oldSize.size === newSize.size && oldSize.color === newSize.color
          );
        });
        if (exists) {
          newArrSizeExist.push(newSize);
        } else {
          newArrSize.push(newSize);
        }
      });

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
          if (newArrFilesString.includes(file.public_id)) {
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
          try {
            await DeleteImage(file.public_id);
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
          const uploadImage: any = await UploadImage(
            file,
            "products",
            "products"
          );
          newArrFileSave.push({
            url: uploadImage.secure_url,
            public_id: uploadImage.public_id,
            created_at: uploadImage.created_at,
            updated_at: uploadImage.created_at,
          });
          try {
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
        colors: [...colorsParse],
        quantity: quantity,
        sizes: [...newArrSizeExist, ...newArrSize],
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
    const colorsParse = JSON.parse(colors);
    const sizeParse = JSON.parse(size);

    const urlImage = [];
    for (const file of files) {
      try {
        const uploadImage: any = await UploadImage(
          file,
          "products",
          "products"
        );
        urlImage.push({
          url: uploadImage.secure_url,
          public_id: uploadImage.public_id,
          created_at: uploadImage.created_at,
          updated_at: uploadImage.created_at,
        });
      } catch (error: any) {
        return NextResponse.json({
          message: `Error saving file: ${error.message}`,
          status: 500,
        });
      }
    }

    await new Product({
      files: urlImage,
      name,
      subName,
      description,
      categories,
      sub_categories,
      sexs,
      price,
      discount,
      discountedPrice,
      colors: colorsParse,
      quantity,
      sizes: sizeParse,
    })
      .save()
      .then(async () => {
        const count = await Product.countDocuments({});
        await Inventories.findOneAndUpdate(
          { inventoryId: process.env.INVENTORY_ID },
          { totalQuantity: count }
        );
      });
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
    const page = Number(searchParams.get("page"));
    const limit = Number(searchParams.get("limit"));

    const products = await Product.find({})
      .sort({ created_at: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Product.countDocuments();

    if (products) {
      return NextResponse.json({
        message: "Get product Successfully",
        status: 200,
        data: products,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
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

    if (id) {
      const files = product.files;
      const publicIds = files.map((file: any) => file.public_id);

      const deleteImage = await DeleteImage(publicIds);

      await Product.findByIdAndDelete(id).then(async () => {
        const count = await Product.countDocuments({});
        await Inventories.findOneAndUpdate(
          { inventoryId: process.env.INVENTORY_ID },
          { totalQuantity: count }
        );
      });
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
