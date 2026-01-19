import jwt, { JwtPayload } from "jsonwebtoken";
import { env } from "../env";

const JWT_SECRET = env.JWT_SECRET;
const ACCESS_TOKEN_EXPIRES_IN = "15m";
const REFRESH_TOKEN_EXPIRES_IN = "7d";

export const assignAccessToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });

export const assignRefreshToken = (payload: JwtPayload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: REFRESH_TOKEN_EXPIRES_IN });

export const verifyAccessToken = (token: string): JwtPayload =>
  jwt.verify(token, JWT_SECRET) as JwtPayload;
