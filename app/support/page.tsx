import type { Metadata } from "next";
import { SupportContent } from "@/components/support/SupportContent";

export const metadata: Metadata = {
  title: "Support",
  description:
    "Get help with Aqademiq. Browse FAQs, learn how features work, or send our team a message — we're here to help.",
};

export default function SupportPage() {
  return <SupportContent />;
}
