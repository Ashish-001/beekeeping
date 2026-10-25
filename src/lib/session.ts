import { SignJWT, jwtVerify } from "jose";
import { ADMIN_CONFIG } from "@/config/admin";

export const SESSION_COOKIE = "hive_admin";
const MAX_AGE_SECONDS = 60 * 60 * 8;

function secretKey() {
  return new TextEncoder().encode(ADMIN_CONFIG.sessionSecret);
}

export async function createSessionToken(username: string) {
  return new SignJWT({ sub: username, role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${MAX_AGE_SECONDS}s`)
    .sign(secretKey());
}

export async function verifySessionToken(token: string | undefined) {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload.role === "admin" ? { username: String(payload.sub) } : null;
  } catch {
    return null;
  }
}

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "lax" as const,
  secure: process.env.NODE_ENV === "production",
  path: "/",
  maxAge: MAX_AGE_SECONDS,
};
