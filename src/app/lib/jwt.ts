import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const SECRET_KEY: any = new TextEncoder().encode(process.env.NEXTAUTH_SECRET);

export async function signToken(payload: any) {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 60 * 60 * 24 * 7;
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setExpirationTime(exp)
    .setIssuedAt(iat)
    .setNotBefore(iat)
    .sign(SECRET_KEY);
}

export async function verifyToken(token: any) {
  try {
    const payload = await jwtVerify(token, SECRET_KEY);
    return payload;
  } catch (error) {
    return error;
  }
}
