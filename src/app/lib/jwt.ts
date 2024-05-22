import jwt from "jsonwebtoken";

const SECRET_KEY: any = process.env.NEXTAUTH_SECRET;

export function signToken(payload: any) {
  return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
}

export function verifyToken(token: any) {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    return null;
  }
}
