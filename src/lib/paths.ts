/** Vite's base keeps navigation and downloads working at / and /Portfolio/. */
export function siteUrl(path = "") {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
