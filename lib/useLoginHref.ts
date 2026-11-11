"use client";

import { useSyncExternalStore } from "react";
import { APP_LOGIN_MOBILE_URL, APP_LOGIN_URL } from "@/lib/config";

/** Phones and tablets, including iPadOS reporting itself as a Mac. */
function isMobileDevice(): boolean {
  try {
    const n = window.navigator;
    return (
      /iPhone|iPad|iPod|Android/i.test(n.userAgent) ||
      (n.platform === "MacIntel" && n.maxTouchPoints > 1)
    );
  } catch {
    return false;
  }
}

// The device never changes under a page, so there is nothing to subscribe to.
const subscribe = () => () => {};

/**
 * Where "Log in" should go. The server and the first client render agree on the
 * web sign-in, so hydration matches; a phone then swaps to the app's smart link.
 */
export function useLoginHref(): string {
  const mobile = useSyncExternalStore(subscribe, isMobileDevice, () => false);
  return mobile ? APP_LOGIN_MOBILE_URL : APP_LOGIN_URL;
}
