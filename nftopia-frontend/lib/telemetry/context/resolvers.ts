// Context resolvers for route and locale
import { AppSurface } from "./types";

// Route resolver: strips query/hash, normalizes trailing slash, SSR safe
export function resolveRoute(pathname?: string): string {
  if (typeof window === "undefined" && !pathname) return "unknown";
  let path = pathname || (typeof window !== "undefined" ? window.location.pathname : "/");
  if (!path) return "/";
  // Remove query and hash if present
  path = path.split("?")[0].split("#")[0];
  // Normalize trailing slash (except root)
  if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
  return path || "/";
}

// Locale resolver: extracts from route or falls back to default
export function resolveLocale(route?: string, defaultLocale = "en"): string {
  let locale = defaultLocale;
  const path = route || (typeof window !== "undefined" ? window.location.pathname : "");
  // Match /en/ or /fr/ at start
  const match = path.match(/^\/?([a-zA-Z-]{2,5})(\/|$)/);
  if (match) locale = match[1].toLowerCase();
  return locale;
}
