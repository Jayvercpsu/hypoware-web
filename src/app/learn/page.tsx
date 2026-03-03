"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { IconWithFallback } from "@/components/IconWithFallback";
import { learnTopics } from "@/data/learnTopics";
import { useAppState } from "@/context/AppStateContext";

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightText(text: string, query: string): ReactNode {
  if (!query.trim()) {
    return text;
  }

  const safeQuery = escapeRegExp(query.trim());
  const regex = new RegExp(`(${safeQuery})`, "gi");
  const chunks = text.split(regex);

  return chunks.map((chunk, index) =>
    index % 2 === 1 ? (
      <mark key={`${chunk}-${index}`}>{chunk}</mark>
    ) : (
      <span key={`${chunk}-${index}`}>{chunk}</span>
    ),
  );
}

export default function LearnPage() {
  const [query, setQuery] = useState("");
  const [selectedTopicId, setSelectedTopicId] = useState(learnTopics[0].id);
  const {
    state: {
      progress: { learnTopicsRead },
    },
    markLearnTopicRead,
  } = useAppState();

  const filteredTopics = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return learnTopics;
    }

    return learnTopics.filter((topic) => {
      const textBlob = [
        topic.title,
        topic.summary,
        ...topic.paragraphs,
        ...topic.bullets,
        ...topic.keywords,
        ...topic.visuals.map((item) => `${item.title} ${item.description}`),
        topic.gifCaption,
        topic.emphasis ?? "",
      ]
        .join(" ")
        .toLowerCase();

      return textBlob.includes(normalized);
    });
  }, [query]);

  useEffect(() => {
    if (!filteredTopics.some((topic) => topic.id === selectedTopicId)) {
      setSelectedTopicId(filteredTopics[0]?.id ?? "");
    }
  }, [filteredTopics, selectedTopicId]);

  const selectedTopic =
    filteredTopics.find((topic) => topic.id === selectedTopicId) ?? filteredTopics[0];

  return (
    <div className="space-y-4">
      <header className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <h1 className="text-2xl font-extrabold text-sky-950">Learn</h1>
        <p className="mt-1 text-sm text-sky-900">
          Beginner-first topics with visual explanations and practical actions.
        </p>
      </header>

      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <aside className="space-y-3 rounded-2xl border border-sky-200 bg-white p-4">
          <label htmlFor="learn-search" className="text-sm font-semibold text-sky-900">
            Search Topics
          </label>
          <div className="relative">
            <IconWithFallback
              src="/icons/search.svg"
              alt="Search"
              label="Search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2"
            />
            <input
              id="learn-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Find symptoms, tips, causes..."
              className="w-full rounded-xl border border-sky-200 py-2 pl-10 pr-3 text-sm outline-none ring-sky-200 focus:ring"
            />
          </div>

          <div className="space-y-2">
            {filteredTopics.length > 0 ? (
              filteredTopics.map((topic, index) => {
                const isSelected = topic.id === selectedTopicId;
                const readAt = learnTopicsRead[topic.id];

                return (
                  <button
                    key={topic.id}
                    type="button"
                    onClick={() => {
                      setSelectedTopicId(topic.id);
                      markLearnTopicRead(topic.id);
                    }}
                    className={`w-full rounded-xl border px-3 py-2 text-left transition ${
                      isSelected
                        ? "border-sky-500 bg-sky-500 text-white"
                        : "border-sky-200 bg-sky-50 text-sky-900 hover:bg-sky-100"
                    }`}
                  >
                    <p className="text-xs font-semibold">Topic {index + 1}</p>
                    <p className="text-sm font-bold">{topic.title}</p>
                    {readAt ? (
                      <p className="mt-1 text-[11px]">Read: {new Date(readAt).toLocaleString()}</p>
                    ) : null}
                  </button>
                );
              })
            ) : (
              <p className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900">
                No topics found for this search.
              </p>
            )}
          </div>
        </aside>

        <section className="min-h-[620px] rounded-2xl border border-sky-200 bg-white p-5">
          {selectedTopic ? (
            <div className="space-y-4">
              <h2 className="text-2xl font-extrabold text-sky-950">
                {highlightText(selectedTopic.title, query)}
              </h2>
              <p className="text-sm font-medium text-sky-800">
                {highlightText(selectedTopic.summary, query)}
              </p>

              <div className="space-y-2 text-sky-900">
                {selectedTopic.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{highlightText(paragraph, query)}</p>
                ))}
              </div>

              <div className="rounded-2xl border border-cyan-200 bg-cyan-50 p-4">
                <div className="space-y-2 text-sm text-cyan-900">
                  {selectedTopic.bullets.map((bullet) => (
                    <p key={bullet}>
                      <span className="font-semibold">- </span>
                      {highlightText(bullet, query)}
                    </p>
                  ))}
                </div>
              </div>

              <div className="grid gap-3 md:grid-cols-3">
                {selectedTopic.visuals.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900"
                  >
                    <p className="text-4xl leading-none">{item.emoji}</p>
                    <p className="mt-2 text-base font-semibold">
                      {highlightText(item.title, query)}
                    </p>
                    <p className="mt-1">{highlightText(item.description, query)}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900">
                <p className="font-bold">Video / GIF</p>
                <p>{highlightText(selectedTopic.gifCaption, query)}</p>
                <img
                  src={selectedTopic.gifPath}
                  alt={`${selectedTopic.title} visual guide`}
                  className="mt-3 h-44 w-full rounded-xl border border-emerald-300 bg-white object-cover p-2"
                  loading="lazy"
                />
              </div>

              {selectedTopic.emphasis ? (
                <p className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-base font-semibold text-amber-900">
                  {highlightText(selectedTopic.emphasis, query)}
                </p>
              ) : null}
            </div>
          ) : (
            <p className="text-sm text-sky-900">Select a topic to view content.</p>
          )}
        </section>
      </div>
    </div>
  );
}
