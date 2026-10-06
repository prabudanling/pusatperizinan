"use client";

import { useEffect } from "react";
import { trackEvent } from "@/lib/analytics";

/** Record intent only; never send WhatsApp drafts, names, or phone numbers. */
export function ConversionTracker() {
  useEffect(() => {
    function onClick(event: MouseEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;
      const url = new URL(link.href, window.location.origin);
      if (url.hostname === "wa.me" || url.hostname === "api.whatsapp.com") {
        trackEvent("whatsapp_click", { page_path: window.location.pathname });
      }
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
