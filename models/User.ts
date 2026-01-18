import { model, models, Schema, Document } from "mongoose";
import { Role, UserStatus } from "@/types/auth";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: Role;
  isEmailVerified: boolean;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["owner", "admin", "editor", "author"],
      default: "editor",
      required: true,
    },
    isEmailVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["active", "inactive", "suspended", "deleted"],
      default: "active",
      required: true,
    },
  },
  { timestamps: true },
);

export const User = models.User || model<IUser>("User", userSchema);
