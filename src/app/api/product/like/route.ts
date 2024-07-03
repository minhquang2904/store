import connectDB from "@/app/config/connectDB";
import Like from "@/app/models/like";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { userId, productId } = await req.json();
    const like = await Like.findOne({ userId });
    let message = "";
    if (!like) {
      const newLike = new Like({
        userId,
        likes: [{ productId }],
      });
      await newLike.save();
      message = "Product added to likes";
      return NextResponse.json({ message: message, status: 200 });
    }
    const likeIndex = like.likes.findIndex(
      (item: any) => item.productId.toString() === productId
    );
    if (likeIndex > -1) {
      like.likes.splice(likeIndex, 1);
      message = "Product removed from likes";
    } else {
      like.likes.push({ productId });
      message = "Product added to likes";
    }

    const likeLength = like.likes.length;

    if (likeLength === 0) {
      await Like.findOneAndDelete({ userId });
      message = "Product removed from likes";
      return NextResponse.json({ message: message, status: 200 });
    }
    await like.save();
    return NextResponse.json({ message: message, status: 200 });
  } catch {
    return NextResponse.json({ message: "An error occurred", status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get("id");
    const like = await Like.findOne({ userId }).populate(
      "likes.productId",
      "files name discountedPrice discount price categories subName quantity"
    );

    if (!like) {
      return NextResponse.json({ message: "No likes found", status: 404 });
    }

    return NextResponse.json({ message: "Success", status: 200, data: like });
  } catch {
    return NextResponse.json({ message: "An error occurred", status: 500 });
  }
}
