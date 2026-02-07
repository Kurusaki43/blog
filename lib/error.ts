import { ZodError } from "zod";

export function formatZodError(err: ZodError) {
  const errors = err.issues.reduce((acc: Record<string, string>, issue) => {
    const field = issue.path[0] as string;
    acc[field] = issue.message;
    return acc;
  }, {});

  return errors;
}
