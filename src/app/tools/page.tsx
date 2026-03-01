"use client";

import { useEffect, useState } from "react";
import { IconWithFallback } from "@/components/IconWithFallback";

const downloads = [
  {
    label: "Emergency Card",
    path: "/downloads/emergency-card.pdf",
  },
  {
    label: "Hypo Checklist",
    path: "/downloads/hypo-checklist.pdf",
  },
];

export default function ToolsPage() {
  const [availability, setAvailability] = useState<Record<string, boolean>>({});

  useEffect(() => {
    let cancelled = false;

    async function checkFiles() {
      const result: Record<string, boolean> = {};

      await Promise.all(
        downloads.map(async (file) => {
          try {
            const response = await fetch(file.path, { method: "HEAD" });
            result[file.path] = response.ok;
          } catch {
            result[file.path] = false;
          }
        }),
      );

      if (!cancelled) {
        setAvailability(result);
      }
    }

    void checkFiles();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <h1 className="text-2xl font-extrabold text-sky-950">Tools</h1>
        <p className="mt-1 text-sm text-sky-900">Quick guides, nutrition help, and downloadable references.</p>
      </header>

      <section className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
        <h2 className="text-lg font-bold text-emerald-900">Symptom Response Guide</h2>
        <div className="mt-3 grid gap-3 md:grid-cols-4">
          {[
            "1) Notice symptoms early.",
            "2) Take quick sugar immediately.",
            "3) Wait 15 minutes and recheck.",
            "4) Eat carb + protein follow-up snack.",
          ].map((step) => (
            <div key={step} className="rounded-xl border border-emerald-200 bg-white p-3 text-sm text-emerald-900">
              {step}
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
          <h2 className="text-lg font-bold text-sky-900">Lifestyle & Nutrition Tips</h2>
          <div className="mt-3 space-y-3 text-sm text-sky-900">
            <p className="font-semibold">Simple meals:</p>
            <ul className="list-disc pl-5">
              <li>Carbs: rice, bread, fruits</li>
              <li>Protein: eggs, fish, chicken, tofu</li>
              <li>Healthy fats: nuts, avocado, milk</li>
            </ul>
          </div>
        </article>

        <article className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
          <h2 className="text-lg font-bold text-cyan-900">Safe Exercise</h2>
          <ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-cyan-900">
            <li>Prefer light to moderate activities.</li>
            <li>Check sugar before and after movement.</li>
            <li>Take a quick snack if glucose is low.</li>
            <li>Avoid intense exercise without preparation.</li>
          </ul>
        </article>
      </section>

      <section className="rounded-2xl border border-sky-200 bg-white p-4">
        <h2 className="text-lg font-bold text-sky-900">Downloadables</h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {downloads.map((file) => {
            const available = availability[file.path];

            return (
              <div key={file.path} className="rounded-xl border border-sky-200 bg-sky-50 p-3">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-sky-900">
                  <IconWithFallback
                    src="/icons/tools.svg"
                    alt={file.label}
                    label={file.label}
                    className="h-4 w-4"
                  />
                  {file.label}
                </p>

                {available === false ? (
                  <p className="mt-2 text-sm text-amber-900">
                    File not found yet. Please add it under <code>/public/downloads</code>.
                  </p>
                ) : (
                  <a
                    href={file.path}
                    download
                    className="mt-2 inline-block rounded-full bg-sky-500 px-3 py-1 text-xs font-bold text-white"
                  >
                    Download
                  </a>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
