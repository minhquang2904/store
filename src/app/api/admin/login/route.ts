import connectDB from "@/app/config/connectDB";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import Admin from "@/app/models/admin";
import { signToken } from "@/app/lib/jwt";
import Inventories from "@/app/models/inventories";
import Product from "@/app/models/product";
import TotalUser from "@/app/models/numberUser";
import User from "@/app/models/user";
import { createCookie } from "@/app/lib/cookie";

export async function POST(req: NextRequest) {
  await connectDB();
  try {
    const checkRole = await Admin.findOne({ role: "admin" });
    if (!checkRole) {
      const salt = await bcryptjs.genSalt(10);
      const hashedPassword = await bcryptjs.hash(
        process.env.ADMIN_PASSWORD!,
        salt
      );

      await new Admin({
        username: "admin",
        password: hashedPassword,
        role: "admin",
      }).save();
    }

    const { username, password } = await req.json();
    const usernameToLowerCase = username.toLowerCase().trim();
    const admin = await Admin.findOne({ username: usernameToLowerCase });
    const inventory = await Inventories.findOne({
      inventoryId: process.env.INVENTORY_ID,
    });
    const totalUser = await TotalUser.findOne({
      numberUserId: process.env.TOTAL_USER_ID,
    });

    if (admin) {
      const isMatch = await bcryptjs.compare(password, admin.password);
      if (isMatch) {
        const id = admin._id;
        const role = admin.role;

        const token = await signToken({
          id,
          username: usernameToLowerCase,
          role,
        });

        const seralized = await createCookie(
          process.env.LOGIN_INFO_ADMIN!,
          token
        );

        if (!inventory) {
          const count = await Product.countDocuments({});
          await new Inventories({
            inventoryId: process.env.INVENTORY_ID,
            totalQuantity: count,
          }).save();
        }

        if (!totalUser) {
          const count = await User.countDocuments({});
          await new TotalUser({
            numberUserId: process.env.TOTAL_USER_ID,
            totalUser: count,
          }).save();
        }

        const response = {
          message: "Authenticated!",
          status: 200,
        };

        return new Response(JSON.stringify(response), {
          status: 200,
          headers: {
            "Set-Cookie": seralized,
          },
        });
      }
      return NextResponse.json({ message: "Login Failed", status: 400 });
    }
    return NextResponse.json({ message: "Login Failed", status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
