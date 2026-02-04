import { clearAuthCookies } from "@/lib/auth/cookies";
import { NextResponse } from "next/server";

export function POST() {
  const response = NextResponse.json(
    { status: "success", message: "Logged out successfully" },
    { status: 200 },
  );
  clearAuthCookies(response);

  return response;
}
