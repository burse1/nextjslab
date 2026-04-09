export { auth as proxy } from "@/auth-edge";

export const config = {
  matcher: ["/add-profile", "/edit-profile/:path*"],
};