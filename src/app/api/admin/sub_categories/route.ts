import connectDB from "@/app/config/connectDB";
import SubCategories from "@/app/models/sub_categories";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { sub_categories, categories } = await req.json();
    const subCategoriesToLowerCase = sub_categories.toLowerCase();
    const type: any = await SubCategories.findOne({
      categoryId: categories,
    });

    if (type) {
      let newArrSubCategories = [];
      newArrSubCategories = await [
        ...type.sub_categories,
        subCategoriesToLowerCase,
      ];

      const newSubCategories = await SubCategories.findOneAndUpdate(
        {
          categoryId: categories,
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
      sub_categories: [subCategoriesToLowerCase],
      categoryId: categories,
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

// export async function GET() {
//   await connectDB();
//   try {
//     const data: any = await SubCategories.find();
//     if (data) {
//       return NextResponse.json({
//         message: "Get Categories Successfully",
//         status: 200,
//         data: data,
//       });
//     }
//     return NextResponse.json({
//       message: "Get Categories Failed",
//       status: 400,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message, status: 500 });
//   }
// }

// export async function DELETE(req: NextRequest) {
//   await connectDB();
//   try {
//     const searchParams = req.nextUrl.searchParams;
//     const id = searchParams.get("id");
//     const data: any = await SubCategories.findByIdAndDelete(id);

//     if (data) {
//       return NextResponse.json({
//         message: "Delete Categories Successfully",
//         status: 200,
//       });
//     }
//     return NextResponse.json({
//       message: "Delete Categories Failed",
//       status: 400,
//     });
//   } catch (error: any) {
//     return NextResponse.json({ error: error.message, status: 500 });
//   }
// }
