import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";

const ROUTES = [
  "",
  "/how-it-works",
  "/science",
  "/students",
  "/about",
  "/faq",
  "/support",
  "/privacy-policy",
  "/terms-of-use",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((path) => ({
    url: `${SITE_URL}${path}`,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
