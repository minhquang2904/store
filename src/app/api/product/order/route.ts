import connectDB from "@/app/config/connectDB";
import Cart from "@/app/models/cart";
import Order from "@/app/models/order";
import Product from "@/app/models/product";
import { NextRequest, NextResponse } from "next/server";
import { startSession } from "mongoose";

export const revalidate = 0;

export async function POST(req: NextRequest) {
  await connectDB();
  const session = await startSession();
  let errorCustom = {
    errorId: "",
    errorName: "",
    errorSize: "",
    errorColor: "",
    errorQuantity: 0,
  };
  try {
    const { userId, address, payment } = await req.json();
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      return NextResponse.json({ message: "Cart not found", status: 404 });
    }

    session.startTransaction();

    for (let i = 0; i < cart.items.length; i++) {
      const { size, color, quantity, productId } = cart.items[i];
      const product = await Product.findOne({ _id: productId }).session(
        session
      );

      const sizeIndex = product.sizes.findIndex(
        (s: any) => s.size === size && s.color === color && s.amount >= quantity
      );

      if (sizeIndex !== -1) {
        product.sizes[sizeIndex].amount -= quantity;
        await product.save({ session });
      } else {
        const findProduct: any = product.sizes.find(
          (s: any) => s.size === size && s.color === color
        );
        errorCustom = {
          errorId: productId,
          errorName: product.name,
          errorSize: size,
          errorColor: color,
          errorQuantity: findProduct.amount,
        };
        throw new Error(
          `Product ${product.name} does not have enough inventory for size ${size} and color ${color}`
        );
      }
    }

    await Cart.deleteOne({ userId }).session(session);

    const newOrder = new Order({
      userId,
      items: cart.items.map(
        ({ productId, size, color, quantity, price, totalPriceItem }: any) => {
          console.log({
            productId,
            size,
            color,
            quantity,
            price,
            totalPriceItem,
          });
          return {
            productId,
            size,
            color,
            quantity,
            price,
            totalPriceItem,
          };
        }
      ),
      payment,
      address: address.addressFull,
      phone: address.phone,
      lastName: address.lastName,
      firstName: address.firstName,
      totalPrice: cart.totalPrice,
    });

    await newOrder.save({ session });

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      message: "Order created successfully",
      status: 200,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({ message: errorCustom, status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const url = new URL(req.nextUrl);
    const userId = url.searchParams.get("id");
    const order = await Order.find({ userId }).sort({ createdAt: -1 });

    if (!order) {
      return NextResponse.json({ message: "Order not found", status: 404 });
    }

    return NextResponse.json({
      message: "Get List order",
      status: 200,
      data: order,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
