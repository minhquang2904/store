import connectDB from "@/app/config/connectDB";
import Cart from "@/app/models/cart";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const { userId, productId, size, quantity, price, color } =
      await req.json();
    const product = await Product.findById(productId);

    if (!product) {
      return NextResponse.json({ message: "Product not found!", status: 404 });
    }

    const stockProduct = product.sizes.find(
      (item: any) => item.size === size && item.color === color
    );

    if (!stockProduct) {
      return NextResponse.json({
        message: "Stock item not found for the specified size and color",
        status: 400,
      });
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({
        userId,
        items: [],
        totalPrice: 0,
      });
    }

    const itemIndex = cart.items.findIndex(
      (item: any) =>
        item.productId.toString() === productId &&
        item.size === size &&
        item.color === color
    );

    let newQuantity = quantity;
    if (itemIndex > -1) {
      newQuantity = cart.items[itemIndex].quantity + quantity;

      if (stockProduct.amount < newQuantity) {
        return NextResponse.json({
          message: "Not enough stock available",
          status: 400,
        });
      }

      cart.items[itemIndex].quantity = newQuantity;
      cart.items[itemIndex].totalPriceItem = price * newQuantity;
    } else {
      if (stockProduct.amount < quantity) {
        return NextResponse.json({
          message: "Not enough stock available",
          status: 400,
        });
      }
      cart.items.push({
        productId,
        size,
        color,
        quantity,
        price,
        totalPriceItem: price * quantity,
      });
    }
    cart.totalPrice = cart.items.reduce(
      (acc: any, item: any) => acc + item.totalPriceItem,
      0
    );

    await cart.save();

    return NextResponse.json({ message: "Add product found!", status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = new URL(req.nextUrl);
    const id = url.searchParams.get("id");

    const cart = await Cart.findOne({ userId: id }).populate(
      "items.productId",
      "files name discountedPrice"
    );

    if (cart && cart?.items?.length === 0) {
      await Cart.findOneAndDelete({ userId: id });
      return NextResponse.json({
        message: "Cart is empty!",
        status: 404,
        data: null,
      });
    }

    let updatedItems = cart.items.map((item: any) => {
      const currentPrice = item.productId.discountedPrice;
      return {
        productId: item.productId._id,
        size: item.size,
        color: item.color,
        quantity: item.quantity,
        price: currentPrice,
        totalPriceItem: currentPrice * item.quantity,
      };
    });

    cart.totalPrice = updatedItems.reduce(
      (acc: any, item: any) => acc + item.totalPriceItem,
      0
    );

    let cartToSave = {
      userId: cart.userId,
      items: updatedItems,
      totalPrice: cart.totalPrice,
    };

    const cartUpdate = await Cart.findByIdAndUpdate(cart._id, cartToSave, {
      new: true,
    }).populate("items.productId", "files name discountedPrice");

    return NextResponse.json({
      message: "Get cart successfully!",
      status: 200,
      data: cartUpdate,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  await connectDB();

  try {
    const url = new URL(req.nextUrl);
    const id = url.searchParams.get("id");
    const userId = url.searchParams.get("userId");
    await Cart.updateOne({ userId }, { $pull: { items: { _id: id } } });
    return NextResponse.json({
      message: "Item removed successfully!",
      status: 200,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
