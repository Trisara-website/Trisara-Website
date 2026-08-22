import { siteConfig } from "@/lib/site-config";

export default function sitemap() {
  const routes = ["", "/events", "/gallery", "/booking"];
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${siteConfig.url}${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
