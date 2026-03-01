import { JournalEntry } from "@/lib/state";

interface JournalImportResult {
  entries: JournalEntry[];
  errors: string[];
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

export function validateJournalImport(input: unknown): JournalImportResult {
  if (!Array.isArray(input)) {
    return {
      entries: [],
      errors: ["Imported file must contain a JSON array of journal entries."],
    };
  }

  const errors: string[] = [];
  const entries: JournalEntry[] = [];

  input.forEach((item, index) => {
    if (typeof item !== "object" || item === null) {
      errors.push(`Entry ${index + 1}: expected an object.`);
      return;
    }

    const raw = item as Partial<JournalEntry>;

    if (
      typeof raw.id !== "string" ||
      typeof raw.dateISO !== "string" ||
      !isStringArray(raw.symptoms) ||
      typeof raw.notes !== "string" ||
      !isStringArray(raw.tags)
    ) {
      errors.push(`Entry ${index + 1}: invalid shape. Required keys: id, dateISO, symptoms, notes, tags.`);
      return;
    }

    entries.push({
      id: raw.id,
      dateISO: raw.dateISO,
      symptoms: raw.symptoms,
      notes: raw.notes,
      tags: raw.tags,
    });
  });

  return { entries, errors };
}
