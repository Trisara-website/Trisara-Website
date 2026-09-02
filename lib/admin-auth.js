import crypto from "crypto";

const COOKIE_NAME = "trisara_admin_session";
const MAX_AGE = 60 * 60 * 24 * 7;

function getSecret() {
  return process.env.ADMIN_SESSION_SECRET || "change-this-admin-session-secret";
}

export function getAdminCredentials() {
  return {
    username: process.env.ADMIN_USERNAME || "admin",
    password: process.env.ADMIN_PASSWORD || "change-me",
  };
}

function sign(value) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createAdminSession(username) {
  const payload = `${username}:${Date.now()}`;
  return `${Buffer.from(payload).toString("base64url")}.${sign(payload)}`;
}

export function verifyAdminSession(token) {
  try {
    if (!token) return false;
    const [encoded, signature] = token.split(".");
    if (!encoded || !signature) return false;
    const payload = Buffer.from(encoded, "base64url").toString("utf8");
    const expected = sign(payload);
    if (signature.length !== expected.length) return false;
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
    const [username, createdAt] = payload.split(":");
    const age = Date.now() - Number(createdAt);
    const { username: configured } = getAdminCredentials();
    return username === configured && Number.isFinite(age) && age >= 0 && age <= MAX_AGE * 1000;
  } catch {
    return false;
  }
}

export function isAdminRequest(request) {
  return verifyAdminSession(request.cookies.get(COOKIE_NAME)?.value);
}

export function setAdminCookie(response, username) {
  response.cookies.set(COOKIE_NAME, createAdminSession(username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export function clearAdminCookie(response) {
  response.cookies.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export { COOKIE_NAME };
