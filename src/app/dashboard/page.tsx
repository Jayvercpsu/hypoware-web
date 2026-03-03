"use client";

import Link from "next/link";
import { BadgeShelf } from "@/components/BadgeShelf";
import { IconWithFallback } from "@/components/IconWithFallback";
import { NurseCard } from "@/components/NurseCard";
import { ProgressWidget } from "@/components/ProgressWidget";

const dashboardTiles = [
  {
    href: "/learn",
    title: "Learn",
    description: "Read beginner-friendly hypoglycemia topics.",
    icon: "/icons/book.svg",
    color: "bg-sky-50 border-sky-200 text-sky-900",
  },
  {
    href: "/tools",
    title: "Tools",
    description: "Use practical guides and downloadables.",
    icon: "/icons/tools.svg",
    color: "bg-emerald-50 border-emerald-200 text-emerald-900",
  },
  {
    href: "/about",
    title: "About",
    description: "Learn how HypoWare was developed.",
    icon: "/icons/info.svg",
    color: "bg-cyan-50 border-cyan-200 text-cyan-900",
  },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <NurseCard expressive mood="happy" message="Where do you want to proceed?" />

      <section className="rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-100 to-emerald-100 p-6 shadow-sm text-white">
        <Link
          href="/interactive"
          className="inline-flex w-full items-center justify-center gap-3 rounded-2xl bg-sky-500 px-6 py-5 text-center text-xl font-extrabold text-white shadow transition hover:bg-sky-600"
        >
          <IconWithFallback
            src="/icons/gamepad.svg"
            alt="Interactive Adventure"
            label="Play"
            className="h-7 w-7"
          />
          Play Interactive Adventure
        </Link>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {dashboardTiles.map((tile) => (
          <Link
            key={tile.href}
            href={tile.href}
            className={`rounded-2xl border p-4 shadow-sm transition hover:-translate-y-0.5 ${tile.color}`}
          >
            <IconWithFallback
              src={tile.icon}
              alt={tile.title}
              label={tile.title}
              className="h-10 w-10 rounded-full bg-white p-2"
            />
            <h2 className="mt-3 text-lg font-bold">{tile.title}</h2>
            <p className="mt-1 text-sm">{tile.description}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <ProgressWidget />
        <BadgeShelf />
      </section>
    </div>
  );
}
