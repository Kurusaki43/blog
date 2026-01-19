import z from "zod";

export const loginSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z
    .string({ error: "Password is required" })
    .min(8, "Password must be at least 8 characters")
    .max(50, "Password must be at most 50 characters"),
});
