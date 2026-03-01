"use client";

import { useState } from "react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { IconWithFallback } from "@/components/IconWithFallback";
import { useAppState } from "@/context/AppStateContext";

interface SettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const lineHeightOptions: Array<1 | 1.5 | 2> = [1, 1.5, 2];

export function SettingsModal({ open, onClose }: SettingsModalProps) {
  const {
    state: { settings },
    setSettings,
    resetAllData,
  } = useAppState();
  const [confirmResetOpen, setConfirmResetOpen] = useState(false);

  if (!open) {
    return null;
  }

  return (
    <>
      <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-slate-900/45 px-3 py-4 sm:items-center sm:px-4">
        <div className="flex max-h-[calc(100dvh-2rem)] w-full max-w-lg flex-col overflow-hidden rounded-3xl border border-sky-200 bg-white p-4 shadow-xl sm:max-h-[90vh] sm:p-6">
          <div className="flex shrink-0 items-start justify-between gap-2">
            <h2 className="text-lg font-bold leading-tight text-sky-950">Accessibility Settings</h2>
            <button
              type="button"
              onClick={onClose}
              className="shrink-0 rounded-full border border-sky-200 px-3 py-1 text-sm text-sky-800 transition hover:bg-sky-50"
            >
              Close
            </button>
          </div>

          <div className="mt-4 flex-1 space-y-5 overflow-y-auto pr-1">
            <div>
              <label htmlFor="text-scale" className="text-sm font-semibold text-sky-900">
                Text Size: {Math.round(settings.textScale * 100)}%
              </label>
              <input
                id="text-scale"
                type="range"
                min={0.8}
                max={2}
                step={0.05}
                value={settings.textScale}
                onChange={(event) =>
                  setSettings({ textScale: Number.parseFloat(event.target.value) })
                }
                className="mt-2 w-full accent-sky-500"
              />
              <p className="mt-1 text-xs text-sky-700">
                Range: 80% to 200% (standard 100%, elderly-friendly default 115%)
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-sky-900">Line Height</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {lineHeightOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setSettings({ lineHeight: option })}
                    className={`rounded-full border px-3 py-1 text-sm transition ${
                      settings.lineHeight === option
                        ? "border-sky-500 bg-sky-500 text-white"
                        : "border-sky-300 bg-white text-sky-900 hover:bg-sky-50"
                    }`}
                  >
                    {option.toFixed(1)}x
                  </button>
                ))}
              </div>
              <p className="mt-1 text-xs text-sky-700">Options: 1.0x, 1.5x (recommended), 2.0x</p>
            </div>

            <div className="rounded-2xl border border-sky-200 bg-sky-50 px-4 py-3">
              <p className="text-sm font-semibold text-sky-900">Font</p>
              <p className="mt-1 text-sm text-sky-800">Sans-serif (simple, all-age friendly)</p>
            </div>

            <div className="space-y-3">
              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-sky-200 px-4 py-3">
                <span className="text-sm font-medium text-sky-900">Reduce Motion</span>
                <input
                  type="checkbox"
                  checked={settings.reduceMotion}
                  onChange={(event) => setSettings({ reduceMotion: event.target.checked })}
                  className="h-5 w-5 accent-sky-600"
                />
              </label>

              <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-sky-200 px-4 py-3">
                <span className="text-sm font-medium text-sky-900">High Contrast (Recommended)</span>
                <input
                  type="checkbox"
                  checked={settings.highContrast}
                  onChange={(event) => setSettings({ highContrast: event.target.checked })}
                  className="h-5 w-5 accent-sky-600"
                />
              </label>
            </div>
          </div>

          <div className="mt-4 flex shrink-0 flex-col-reverse gap-2 border-t border-sky-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
            <button
              type="button"
              onClick={() => setConfirmResetOpen(true)}
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-rose-300 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700 transition hover:bg-rose-100 sm:w-auto"
            >
              <IconWithFallback
                src="/icons/settings.svg"
                alt="Reset"
                label="Reset"
                className="h-4 w-4"
              />
              Reset All Data
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full rounded-full bg-sky-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-sky-600 sm:w-auto"
            >
              Save & Close
            </button>
          </div>
        </div>
      </div>

      <ConfirmModal
        open={confirmResetOpen}
        title="Reset all HypoWare data?"
        message="This removes settings, progress, journal entries, badges, and saved contact info from this device."
        confirmText="Reset"
        cancelText="Go Back"
        variant="danger"
        onCancel={() => setConfirmResetOpen(false)}
        onConfirm={() => {
          resetAllData();
          setConfirmResetOpen(false);
          onClose();
        }}
      />
    </>
  );
}
