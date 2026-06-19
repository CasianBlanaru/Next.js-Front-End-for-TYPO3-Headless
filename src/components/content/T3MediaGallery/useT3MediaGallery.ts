import { useMemo } from "react";
import type { T3Gallery } from "@/types";

export const useT3MediaGallery = (gallery?: T3Gallery) => {
  const galleryClassList = useMemo(() => {
    if (!gallery) {
      return [];
    }

    const position = gallery.position ?? {};
    const border = gallery.border ?? {};

    return [
      `t3-ce-gallery--horizontal-${position.horizontal ?? "center"}`,
      `t3-ce-gallery--vertical-${position.vertical ?? "top"}`,
      position.noWrap ? "t3-ce-gallery--no-wrap" : "",
      border.enabled ? "t3-ce-gallery--border" : "",
    ].filter(Boolean);
  }, [gallery]);

  return {
    galleryClassList,
  };
};