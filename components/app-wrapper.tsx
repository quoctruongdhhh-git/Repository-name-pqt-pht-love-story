"use client";

import type { ReactNode } from "react";
import { MusicWidget } from "./music-widget";

export function AppWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <MusicWidget />
    </>
  );
}
