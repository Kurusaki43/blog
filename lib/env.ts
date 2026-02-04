import { cleanEnv, str } from "envalid";

export const env = cleanEnv(process.env, {
  MONGO_URI: str(),
  JWT_ACCESS_SECRET: str(),
  JWT_REFRESH_SECRET: str(),
});
