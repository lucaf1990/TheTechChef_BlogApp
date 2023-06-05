export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/main:path*",
    "/myRecipe:path*",
    "/chefs:path*",
    "/profile:path*",
    "/search:path*",
    "/chefProfiles:path*",
  ],
};
