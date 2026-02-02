import { NextResponse } from "next/server";

const COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days

export function setRefreshTokenCookie(res: NextResponse, token: string) {
  res.cookies.set("refreshToken", token, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    path: "/",
    maxAge: COOKIE_MAX_AGE,
  });
}
