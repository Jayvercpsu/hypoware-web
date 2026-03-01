"use client";

import { IconWithFallback } from "@/components/IconWithFallback";
import { useAppState } from "@/context/AppStateContext";

interface BadgeShelfProps {
  preview?: boolean;
}

export function BadgeShelf({ preview = false }: BadgeShelfProps) {
  const {
    state: {
      progress: { badges },
    },
  } = useAppState();

  const visibleBadges = preview ? badges.slice(0, 3) : badges;

  return (
    <section className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-emerald-900">Achievement Shelf</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        {visibleBadges.length > 0 ? (
          visibleBadges.map((badge) => (
            <div
              key={badge}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-300 bg-white px-3 py-1 text-xs font-semibold text-emerald-900"
              title={badge}
            >
              <IconWithFallback
                src="/icons/badge.svg"
                alt="Badge"
                label="Badge"
                className="h-5 w-5"
              />
              <span>{badge}</span>
            </div>
          ))
        ) : (
          <p className="text-xs text-emerald-800">No badges yet. Complete activities to unlock one.</p>
        )}
      </div>
    </section>
  );
}
