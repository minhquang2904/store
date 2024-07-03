import connectDB from "@/app/config/connectDB";
import Cart from "@/app/models/cart";
import Order from "@/app/models/order";
import Product from "@/app/models/product";
import HistoryOrder from "@/app/models/history_order";
import { NextRequest, NextResponse } from "next/server";
import { startSession } from "mongoose";

export const revalidate = 0;

export async function PUT(req: NextRequest) {
  await connectDB();
  const session = await startSession();
  let errorCustom = {
    error: "",
    errorId: "",
    errorName: "",
    errorSize: "",
    errorColor: "",
    errorQuantity: 0,
  };
  try {
    const { orderId } = await req.json();
    const historyOrder = await HistoryOrder.findOne({ _id: orderId });

    if (!historyOrder) {
      errorCustom.error = "Order not found";
      throw new Error("Order not found");
    }

    session.startTransaction();

    for (let i = 0, j = historyOrder.items.length; i < j; i++) {
      const { size, color, quantity, productId, price } = historyOrder.items[i];
      const product = await Product.findOne({ _id: productId }).session(
        session
      );

      if (!product) {
        errorCustom.error = "Product not found";
        throw new Error("Product not found");
      }

      const priceIndex = product.discountedPrice > price;

      if (priceIndex) {
        errorCustom.error = "Price of product has been changed";
        errorCustom.errorId = productId;
        throw new Error("Price of product has been changed");
      }

      const sizeIndex = product.sizes.findIndex(
        (s: any) => s.size === size && s.color === color && s.amount >= quantity
      );

      if (sizeIndex > -1) {
        product.sizes[sizeIndex].amount -= quantity;
        product.soldCount += quantity;
        product.quantity -= quantity;
        await product.save({ session });
      } else {
        errorCustom = {
          error: "Product does not have enough inventory for size and color",
          errorId: productId,
          errorName: "",
          errorSize: "",
          errorColor: "",
          errorQuantity: 0,
        };

        throw new Error(
          "Product does not have enough inventory for size and color"
        );
      }
    }

    const newOrder = new Order({
      userId: historyOrder.userId,
      items: historyOrder.items,
      email: historyOrder.email,
      payment: historyOrder.payment,
      address: historyOrder.address,
      phone: historyOrder.phone,
      lastName: historyOrder.lastName,
      firstName: historyOrder.firstName,
      totalPrice: historyOrder.totalPrice,
    });

    await newOrder.save({ session });

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      message: "Re-order successfully!",
      status: 200,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({ message: errorCustom, status: 500 });
  }
}

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
    const { userId, address, payment, email } = await req.json();
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
        product.soldCount += quantity;
        product.quantity -= quantity;
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
      email,
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
    const order = await Order.find({ userId })
      .sort({ createdAt: -1 })
      .populate("items.productId", "name files");

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

export async function DELETE(req: NextRequest) {
  await connectDB();
  const session = await startSession();
  let errorCustom = {
    error: "",
  };
  try {
    const url = new URL(req.nextUrl);
    const orderId = url.searchParams.get("orderId");
    const order = await Order.findOne({ _id: orderId });

    if (!order) {
      errorCustom.error = "Your order has been confirmed";
      return NextResponse.json({ message: errorCustom, status: 404 });
    }

    session.startTransaction();

    for (let i = 0; i < order.items.length; i++) {
      const { size, color, quantity, productId } = order.items[i];
      const product = await Product.findOne({ _id: productId }).session(
        session
      );

      const sizeIndex = product.sizes.findIndex(
        (s: any) => s.size === size && s.color === color
      );
      console.log(sizeIndex);
      if (sizeIndex > -1) {
        product.sizes[sizeIndex].amount += quantity;
        product.soldCount -= quantity;
        product.quantity += quantity;
        await product.save({ session });
      } else {
        product.sizes.push({ size, color, amount: quantity });
        product.colors.push({ value: color, label: color });
        product.soldCount -= quantity;
        product.quantity += quantity;
        await product.save({ session });
      }
    }

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
      status: "cancel",
      createdAt: order.createdAt,
      updatedAt: new Date(),
    });

    await historyOrder.save({ session });

    await Order.deleteOne({ _id: orderId }).session(session);

    await session.commitTransaction();
    session.endSession();

    return NextResponse.json({
      message: "Delete order successfully",
      status: 200,
    });
  } catch (error: any) {
    await session.abortTransaction();
    session.endSession();
    return NextResponse.json({ message: errorCustom, status: 500 });
  }
}
