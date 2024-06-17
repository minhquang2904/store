import connectDB from "@/app/config/connectDB";
import Product from "@/app/models/product";
import SubCategories from "@/app/models/sub_categories";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { sub_categories, id, categories } = await req.json();
    const type: any = await SubCategories.findOne({
      categoryId: id,
    });
    const splitSubCategories = sub_categories.split(",");
    const cleanedStrings = splitSubCategories.map((s: any) =>
      s
        .replace(/\s{2,}/g, " ")
        .trim()
        .toLowerCase()
    );

    if (type) {
      let newArrSubCategories = [];
      newArrSubCategories = await [...type.sub_categories];
      const filterSubCategories = newArrSubCategories.filter((value: any) =>
        cleanedStrings.includes(value)
      );

      if (filterSubCategories.length > 0) {
        return NextResponse.json({
          message: "Categories is Exist",
          status: 400,
          data: filterSubCategories,
        });
      }

      newArrSubCategories.push(...cleanedStrings);

      const newSubCategories = await SubCategories.findOneAndUpdate(
        {
          categoryId: id,
        },
        { sub_categories: newArrSubCategories }
      );

      return NextResponse.json({
        message: "Add Sub_Categories Successfully",
        status: 200,
        newSubCategories: newSubCategories,
      });
    }

    const newSubCategories = await new SubCategories({
      sub_categories: cleanedStrings,
      categories: categories,
      categoryId: id,
    }).save();

    return NextResponse.json({
      message: "Add Sub_Categories Successfully",
      status: 200,
      newSubCategories: newSubCategories,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET() {
  await connectDB();
  try {
    const data: any = await SubCategories.find();
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
    const { item, sub_categories_id } = await req.json();
    const products = await Product.find({}, { sub_categories: 1, _id: 0 });

    for (const value of products) {
      if (value.sub_categories === item) {
        return NextResponse.json({
          message: `Delete Sub_categories Failed, ${item} is used`,
          status: 400,
        });
      }
    }
    const type: any = await SubCategories.findOne({
      _id: sub_categories_id,
    });
    if (type) {
      let newArrSubCategories = [];
      newArrSubCategories = [...type.sub_categories];
      const filerSubCategories = newArrSubCategories.filter((data) => {
        return item != data;
      });

      const newSubCategories = await SubCategories.findOneAndUpdate(
        {
          _id: type._id,
        },
        { sub_categories: filerSubCategories }
      );

      const typeCheck: any = await SubCategories.findOne({
        _id: sub_categories_id,
      });

      if (typeCheck.sub_categories.length == 0) {
        await SubCategories.findByIdAndDelete(sub_categories_id);
      }

      return NextResponse.json({
        message: "Delete Sub_Categories Successfully",
        status: 200,
      });
    }
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
