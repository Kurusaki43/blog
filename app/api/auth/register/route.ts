import { connectDB } from "@/lib/mongoose";
import { registerSchema } from "@/lib/schemas/auth/registerSchema";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";
import { hashPassword } from "@/lib/auth/hash";
import { Profile } from "@/models/Profile";
import { formatZodError } from "@/lib/error";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json();

    const validUserData = registerSchema.parse(body);

    const existingUser = await User.findOne({ email: validUserData.email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email already in use" },
        { status: 409 },
      );
    }
    const { password } = validUserData;
    const hashedPassword = await hashPassword(password);
    validUserData.password = hashedPassword;

    const newUser = await User.create(validUserData);
    await Profile.create({ userId: newUser._id });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 },
    );
  } catch (err) {
    if (err instanceof ZodError) {
      const errors = formatZodError(err);
      return NextResponse.json({ errors }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
