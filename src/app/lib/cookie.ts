import { serialize } from "cookie";

const MAX_AGE = 60 * 60 * 24 * 7;

export async function createCookie(cookieName: any, token: any) {
  const seralized = await serialize(cookieName, token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: MAX_AGE,
    path: "/",
  });
  return seralized;
}
