import { NextResponse } from "next/server";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";

const REFRESH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 7 days
const ACCESS_COOKIE_MAX_AGE = 15 * 60; // 15 minutes

const defaultCookieOptions: Partial<ResponseCookie> = {
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

const refreshCookieOptions: Partial<ResponseCookie> = {
  ...defaultCookieOptions,
  maxAge: REFRESH_COOKIE_MAX_AGE,
};

const accessCookieOptions: Partial<ResponseCookie> = {
  ...defaultCookieOptions,
  maxAge: ACCESS_COOKIE_MAX_AGE,
};

export function setAuthCookies(
  res: NextResponse,
  accessToken: string,
  refreshToken: string,
) {
  res.cookies
    .set("accessToken", accessToken, accessCookieOptions)
    .set("refreshToken", refreshToken, refreshCookieOptions);
}

export function clearAuthCookies(res: NextResponse) {
  res.cookies.delete("accessToken").delete("refreshToken");
}
