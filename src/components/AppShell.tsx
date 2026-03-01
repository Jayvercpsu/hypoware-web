"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, useMemo, useState } from "react";
import { BadgeShelf } from "@/components/BadgeShelf";
import { IconWithFallback } from "@/components/IconWithFallback";
import { ProgressWidget } from "@/components/ProgressWidget";
import { SettingsModal } from "@/components/SettingsModal";
import { navItems } from "@/data/navigation";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);

  const desktopHeaderLinks = useMemo(
    () => navItems.filter((item) => item.href !== "/dashboard"),
    [],
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 via-cyan-50 to-emerald-50 text-sky-950">
      <header className="sticky top-0 z-40 border-b border-sky-200 bg-white/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3 px-3 py-3 md:px-6">
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setDrawerOpen(true)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-sky-200 bg-white text-sky-900 md:hidden"
            >
              <span className="text-lg">=</span>
            </button>

            <Link href="/" className="inline-flex items-center gap-2 rounded-full px-2 py-1">
              <IconWithFallback
                src="/icons/heart.svg"
                alt="HypoWare logo"
                label="HypoWare"
                className="h-9 w-9 rounded-full border border-sky-200 bg-white p-1"
              />
              <span className="text-lg font-extrabold tracking-tight text-sky-900">HypoWare</span>
            </Link>
          </div>

          <nav className="hidden items-center gap-2 lg:flex">
            {desktopHeaderLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3 py-2 text-sm font-semibold transition",
                  pathname === item.href
                    ? "bg-sky-500 !text-white"
                    : "text-sky-900 hover:bg-sky-100",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setSettingsOpen(true)}
            className="inline-flex items-center gap-2 rounded-full border border-sky-200 bg-white px-3 py-2 text-sm font-semibold text-sky-900 transition hover:bg-sky-50"
          >
            <IconWithFallback
              src="/icons/settings.svg"
              alt="Settings"
              label="Settings"
              className="h-4 w-4"
            />
            Settings
          </button>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[1400px] gap-4 px-3 py-4 md:px-6 md:py-5">
        <aside className="hidden w-72 shrink-0 flex-col gap-4 md:flex">
          <div className="rounded-3xl border border-sky-200 bg-white/90 p-4 shadow-sm">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-sky-700">Navigation</p>
            <div className="space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition",
                    pathname === item.href
                      ? "bg-sky-500 !text-white"
                      : "text-sky-900 hover:bg-sky-100",
                  )}
                >
                  <IconWithFallback
                    src={item.icon}
                    alt={item.label}
                    label={item.label}
                    className={cn(
                      "h-6 w-6 rounded-full p-1",
                      pathname === item.href ? "bg-white/20" : "bg-white",
                    )}
                  />
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <ProgressWidget />
          <BadgeShelf preview />
        </aside>

        <main className="min-w-0 flex-1 rounded-3xl border border-sky-200 bg-white/88 p-4 shadow-sm md:p-6">
          {children}

          <footer className="mt-10 border-t border-sky-200 pt-5 text-sm text-sky-800">
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/privacy" className="font-semibold hover:text-sky-600">
                Privacy Policy
              </Link>
              <Link href="/terms" className="font-semibold hover:text-sky-600">
                Terms
              </Link>
              <Link href="/contact" className="font-semibold hover:text-sky-600">
                Contact
              </Link>
              <a href="#" className="font-semibold hover:text-sky-600">
                Social
              </a>
            </div>
          </footer>
        </main>
      </div>

      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden",
          drawerOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-slate-900/45 transition",
            drawerOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setDrawerOpen(false)}
        />
        <aside
          className={cn(
            "absolute left-0 top-0 h-full w-[86%] max-w-[320px] overflow-y-auto border-r border-sky-200 bg-white p-4 shadow-xl transition-transform duration-300",
            drawerOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          <div className="mb-4 flex items-center justify-between">
            <div className="inline-flex items-center gap-2">
              <IconWithFallback
                src="/icons/heart.svg"
                alt="HypoWare logo"
                label="HypoWare"
                className="h-8 w-8 rounded-full border border-sky-200 bg-white p-1"
              />
              <span className="font-bold">HypoWare</span>
            </div>
            <button
              type="button"
              onClick={() => setDrawerOpen(false)}
              className="rounded-full border border-sky-200 px-2 py-1 text-sm"
            >
              Close
            </button>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setDrawerOpen(false)}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-3 py-2 text-sm font-medium transition",
                  pathname === item.href
                    ? "bg-sky-500 !text-white"
                    : "text-sky-900 hover:bg-sky-100",
                )}
              >
                <IconWithFallback
                  src={item.icon}
                  alt={item.label}
                  label={item.label}
                  className={cn(
                    "h-6 w-6 rounded-full p-1",
                    pathname === item.href ? "bg-white/20" : "bg-white",
                  )}
                />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 space-y-4 pb-6">
            <BadgeShelf preview />
            <ProgressWidget />
          </div>
        </aside>
      </div>

      <SettingsModal open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}
