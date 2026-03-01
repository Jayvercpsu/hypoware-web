"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import { ConfirmModal } from "@/components/ConfirmModal";
import { useToast } from "@/components/ToastProvider";
import { useAppState } from "@/context/AppStateContext";
import { validateJournalImport } from "@/lib/journal";
import { JournalEntry } from "@/lib/state";
import { formatDateReadable } from "@/lib/utils";

const symptomOptions = [
  "shaky",
  "dizzy",
  "sweating",
  "fast heartbeat",
  "hungry",
  "tired",
  "confused",
];

export default function JournalPage() {
  const {
    state: { journalEntries },
    addJournalEntry,
    setJournalEntries,
    clearJournalEntries,
  } = useAppState();
  const { addToast } = useToast();

  const [dateValue, setDateValue] = useState(new Date().toISOString().slice(0, 10));
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [tagsInput, setTagsInput] = useState("");
  const [notes, setNotes] = useState("");

  const [filterSymptom, setFilterSymptom] = useState("all");
  const [filterTag, setFilterTag] = useState("");
  const [searchNotes, setSearchNotes] = useState("");

  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [clearConfirmOpen, setClearConfirmOpen] = useState(false);

  const sortedEntries = useMemo(
    () => [...journalEntries].sort((a, b) => new Date(b.dateISO).getTime() - new Date(a.dateISO).getTime()),
    [journalEntries],
  );

  const visibleEntries = useMemo(() => {
    const noteQuery = searchNotes.trim().toLowerCase();
    const tagQuery = filterTag.trim().toLowerCase();

    return sortedEntries.filter((entry) => {
      const symptomMatch = filterSymptom === "all" || entry.symptoms.includes(filterSymptom);
      const tagMatch = !tagQuery || entry.tags.some((tag) => tag.toLowerCase().includes(tagQuery));
      const notesMatch = !noteQuery || entry.notes.toLowerCase().includes(noteQuery);

      return symptomMatch && tagMatch && notesMatch;
    });
  }, [filterSymptom, filterTag, searchNotes, sortedEntries]);

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms((previous) =>
      previous.includes(symptom)
        ? previous.filter((item) => item !== symptom)
        : [...previous, symptom],
    );
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!notes.trim() && selectedSymptoms.length === 0) {
      addToast("Add notes or choose at least one symptom.", "error");
      return;
    }

    const tags = tagsInput
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    const entry: JournalEntry = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `${Date.now()}`,
      dateISO: new Date(`${dateValue}T12:00:00`).toISOString(),
      symptoms: selectedSymptoms,
      notes: notes.trim(),
      tags,
    };

    addJournalEntry(entry);
    setNotes("");
    setSelectedSymptoms([]);
    setTagsInput("");
    addToast("Journal entry saved.", "success");
  };

  const exportJson = () => {
    const data = JSON.stringify(sortedEntries, null, 2);
    const blob = new Blob([data], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "hypoware-journal.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importJson = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    try {
      const text = await file.text();
      const parsed = JSON.parse(text) as unknown;
      const result = validateJournalImport(parsed);

      if (result.errors.length > 0) {
        setImportErrors(result.errors);
        addToast("Import failed. Please review the errors.", "error");
        return;
      }

      setJournalEntries(result.entries);
      setImportErrors([]);
      addToast("Journal imported.", "success");
    } catch {
      setImportErrors(["Could not parse JSON file."]);
      addToast("Import failed. Invalid JSON.", "error");
    } finally {
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-6">
      <header className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
        <h1 className="text-2xl font-extrabold text-sky-950">Journal</h1>
        <p className="mt-1 text-sm text-sky-900">Track symptoms, notes, and daily patterns.</p>
      </header>

      <section className="rounded-2xl border border-sky-200 bg-white p-4">
        <h2 className="text-lg font-bold text-sky-900">New Entry</h2>
        <form onSubmit={handleSave} className="mt-3 space-y-4">
          <label className="block text-sm font-semibold text-sky-900">
            Date
            <input
              type="date"
              value={dateValue}
              onChange={(event) => setDateValue(event.target.value)}
              className="mt-1 w-full rounded-xl border border-sky-200 px-3 py-2 text-sm"
            />
          </label>

          <div>
            <p className="text-sm font-semibold text-sky-900">Symptoms</p>
            <div className="mt-2 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {symptomOptions.map((symptom) => (
                <label key={symptom} className="flex items-center gap-2 rounded-xl border border-sky-200 bg-sky-50 px-3 py-2 text-sm text-sky-900">
                  <input
                    type="checkbox"
                    checked={selectedSymptoms.includes(symptom)}
                    onChange={() => handleSymptomToggle(symptom)}
                    className="accent-sky-600"
                  />
                  {symptom}
                </label>
              ))}
            </div>
          </div>

          <label className="block text-sm font-semibold text-sky-900">
            Tags (comma separated)
            <input
              type="text"
              value={tagsInput}
              onChange={(event) => setTagsInput(event.target.value)}
              placeholder="morning, post-walk, snack"
              className="mt-1 w-full rounded-xl border border-sky-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="block text-sm font-semibold text-sky-900">
            Notes
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              rows={4}
              placeholder="How did you feel? What helped?"
              className="mt-1 w-full rounded-xl border border-sky-200 px-3 py-2 text-sm"
            />
          </label>

          <button
            type="submit"
            className="rounded-full bg-sky-500 px-5 py-2 text-sm font-bold text-white transition hover:bg-sky-600"
          >
            Save Entry
          </button>
        </form>
      </section>

      <section className="rounded-2xl border border-sky-200 bg-white p-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-sky-900">Entries</h2>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={exportJson}
              className="rounded-full border border-sky-300 bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-900"
            >
              Export JSON
            </button>
            <label className="rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-900">
              Import JSON
              <input type="file" accept="application/json" onChange={importJson} className="hidden" />
            </label>
            <button
              type="button"
              onClick={() => setClearConfirmOpen(true)}
              className="rounded-full border border-rose-300 bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-900"
            >
              Clear Journal
            </button>
          </div>
        </div>

        <div className="mt-4 grid gap-2 sm:grid-cols-3">
          <label className="text-sm text-sky-900">
            Filter symptom
            <select
              value={filterSymptom}
              onChange={(event) => setFilterSymptom(event.target.value)}
              className="mt-1 w-full rounded-xl border border-sky-200 px-3 py-2 text-sm"
            >
              <option value="all">All symptoms</option>
              {symptomOptions.map((symptom) => (
                <option key={symptom} value={symptom}>
                  {symptom}
                </option>
              ))}
            </select>
          </label>

          <label className="text-sm text-sky-900">
            Filter tag
            <input
              value={filterTag}
              onChange={(event) => setFilterTag(event.target.value)}
              placeholder="e.g. morning"
              className="mt-1 w-full rounded-xl border border-sky-200 px-3 py-2 text-sm"
            />
          </label>

          <label className="text-sm text-sky-900">
            Search notes
            <input
              value={searchNotes}
              onChange={(event) => setSearchNotes(event.target.value)}
              placeholder="Search text"
              className="mt-1 w-full rounded-xl border border-sky-200 px-3 py-2 text-sm"
            />
          </label>
        </div>

        {importErrors.length > 0 ? (
          <div className="mt-3 rounded-xl border border-rose-300 bg-rose-50 p-3 text-sm text-rose-900">
            <p className="font-semibold">Import errors:</p>
            <ul className="mt-1 list-disc pl-5">
              {importErrors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-4 space-y-3">
          {visibleEntries.length > 0 ? (
            visibleEntries.map((entry) => (
              <article key={entry.id} className="rounded-xl border border-sky-200 bg-sky-50 p-3">
                <p className="text-xs font-semibold text-sky-800">{formatDateReadable(entry.dateISO)}</p>
                <p className="mt-1 text-sm text-sky-900">{entry.notes || "(No notes)"}</p>
                <p className="mt-2 text-xs text-sky-800">Symptoms: {entry.symptoms.join(", ") || "none"}</p>
                <p className="mt-1 text-xs text-sky-800">Tags: {entry.tags.join(", ") || "none"}</p>
              </article>
            ))
          ) : (
            <p className="rounded-xl border border-sky-200 bg-sky-50 p-3 text-sm text-sky-900">
              No entries match the current filters.
            </p>
          )}
        </div>
      </section>

      <ConfirmModal
        open={clearConfirmOpen}
        title="Clear all journal entries?"
        message="This action removes every saved entry on this device."
        confirmText="Clear"
        cancelText="Go Back"
        variant="danger"
        onCancel={() => setClearConfirmOpen(false)}
        onConfirm={() => {
          clearJournalEntries();
          setClearConfirmOpen(false);
          addToast("Journal cleared.", "info");
        }}
      />
    </div>
  );
}
