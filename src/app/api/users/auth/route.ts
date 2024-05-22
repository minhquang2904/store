import jwt from "jsonwebtoken";
import cookie from "cookie";
import User from "@/app/models/user";
import connectDB from "@/app/config/connectDB";

const SECRET_KEY: any = process.env.NEXTAUTH_SECRET;

export default async function handler(req: any, res: any) {
  await connectDB();

  const { token } = cookie.parse(req.headers.cookie || "");

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    const user = await User.findOne({ decoded });
    console.log(decoded);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
}
