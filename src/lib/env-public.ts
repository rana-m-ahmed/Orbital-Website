/**
 * Public site configuration only.
 *
 * This module is safe to import from Client Components. Never add server
 * credentials here.
 */
export function siteUrl(): string {
  const value = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  return value || "https://reachorbital.tech";
}

export function publicContactEmail(): string {
  const value = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  return value || "orbitalteamhq@gmail.com";
}
