export function isAdminRequestAuthorized(request: Request) {
  const authHeader = request.headers.get("authorization") ?? "";
  return authHeader.startsWith("Bearer ") && authHeader.slice("Bearer ".length).trim().length > 0;
}
