import { Cookies } from "react-cookie";

const cookies = new Cookies();

export function setSession(token: string, role: string) {
  cookies.set("token", token, { path: "/", sameSite: "lax" });
  cookies.set("role", role, { path: "/", sameSite: "lax" });
}

export function clearSession() {
  cookies.remove("token", { path: "/" });
  cookies.remove("role", { path: "/" });
}

export function getToken() {
  return cookies.get("token");
}

export function getRole() {
  return cookies.get("role");
}
