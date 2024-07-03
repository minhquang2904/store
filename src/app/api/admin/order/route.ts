import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/app/config/connectDB";
import Order from "@/app/models/order";
import { startSession } from "mongoose";
import HistoryOrder from "@/app/models/history_order";

export const revalidate = 0;

export async function PUT(req: NextRequest) {
  await connectDB();
  const session = await startSession();

  try {
    const { id } = await req.json();
    const order = await Order.findById(id);
    if (!order) {
      throw new Error(`Order with id ${id} not found`);
    }

    session.startTransaction();

    const historyOrder = new HistoryOrder({
      userId: order.userId,
      items: order.items,
      email: order.email,
      totalPrice: order.totalPrice,
      payment: order.payment,
      address: order.address,
      phone: order.phone,
      lastName: order.lastName,
      firstName: order.firstName,
      status: "confirm",
      createdAt: order.createdAt,
      updatedAt: new Date(),
    });

    await historyOrder.save({ session });

    await Order.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      message: "Confirm order success!",
      status: 200,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({ message: error.message, status: 500 });
  }
}

export async function GET(req: NextRequest) {
  await connectDB();
  try {
    const order = await Order.find()
      .sort({ createdAt: -1 })
      .populate("items.productId", "files name");

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
