"use client";

import { ReactNode } from "react";
import { ToastProvider } from "@/components/ToastProvider";
import { AppStateProvider } from "@/context/AppStateContext";

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AppStateProvider>
      <ToastProvider>{children}</ToastProvider>
    </AppStateProvider>
  );
}
