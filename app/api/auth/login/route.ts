import { setAuthCookies } from "@/lib/auth/cookies";
import { comparePasswords } from "@/lib/auth/hash";
import { assignAccessToken, assignRefreshToken } from "@/lib/auth/jwt";
import { connectDB } from "@/lib/mongoose";
import { loginSchema } from "@/lib/schemas/auth/loginSchema";
import { IUser, User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const body = await req.json();

    const { email, password } = loginSchema.parse(body);

    const existingUser: IUser | null = await User.findOne({ email });
    if (!existingUser) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    const isPasswordValid = await comparePasswords(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 },
      );
    }

    // JWT Tokens Assignment
    const payload = {
      userId: existingUser._id.toString(),
      role: existingUser.role,
    };
    const accessToken = assignAccessToken(payload);
    const refreshToken = assignRefreshToken(payload);

    existingUser.refreshToken = refreshToken;
    await existingUser.save();

    const response = NextResponse.json(
      { status: "success", message: "Login successful" },
      { status: 200 },
    );

    setAuthCookies(response, accessToken, refreshToken);

    return response;
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = err.issues.reduce((acc: Record<string, string>, issue) => {
        const field = issue.path[0] as string;
        acc[field] = issue.message;
        return acc;
      }, {});

      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
