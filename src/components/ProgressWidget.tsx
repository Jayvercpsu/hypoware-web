"use client";

import { learnTopics } from "@/data/learnTopics";
import { useAppState } from "@/context/AppStateContext";
import { TOTAL_GAME_SCENES } from "@/lib/state";

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = max === 0 ? 0 : Math.min(100, Math.round((value / max) * 100));

  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-sky-100">
      <div
        className="h-full rounded-full bg-sky-500 transition-all duration-300"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

export function ProgressWidget() {
  const {
    state: {
      progress: { learnTopicsRead, game, badges },
    },
  } = useAppState();

  const topicsRead = Object.keys(learnTopicsRead).length;
  const scenesDone = game.completedScenes.length;

  return (
    <section className="rounded-2xl border border-sky-200 bg-sky-50/80 p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-sky-900">Progress</h3>

      <div className="mt-3 space-y-3">
        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-sky-900">
            <span>Learn Topics</span>
            <span>
              {topicsRead}/{learnTopics.length}
            </span>
          </div>
          <ProgressBar value={topicsRead} max={learnTopics.length} />
        </div>

        <div>
          <div className="mb-1 flex items-center justify-between text-xs text-sky-900">
            <span>Adventure Scenes</span>
            <span>
              {scenesDone}/{TOTAL_GAME_SCENES}
            </span>
          </div>
          <ProgressBar value={scenesDone} max={TOTAL_GAME_SCENES} />
        </div>

        <div className="rounded-xl bg-white px-3 py-2 text-xs text-sky-900">
          Badges Earned: <strong>{badges.length}</strong>
        </div>
      </div>
    </section>
  );
}
