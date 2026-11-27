"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { resolveLegacyRoute } from "@/lib/legacy-routes";
import { BASE_PATH } from "@/lib/site";

/**
 * On a static host an old URL lands on the 404 page. If the address is one the
 * site used to have, send the visitor to where that content lives now.
 */
export function LegacyRedirect() {
  const router = useRouter();

  useEffect(() => {
    const path = window.location.pathname;
    const local = BASE_PATH && path.startsWith(BASE_PATH) ? path.slice(BASE_PATH.length) : path;
    const target = resolveLegacyRoute(local || "/");
    if (target) router.replace(target);
  }, [router]);

  return null;
}
