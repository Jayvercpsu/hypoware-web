export type LineHeightOption = 1 | 1.5 | 2;
export type SceneResult = "good" | "bad";

export interface AppSettings {
  textScale: number;
  lineHeight: LineHeightOption;
  reduceMotion: boolean;
  highContrast: boolean;
}

export interface GameProgress {
  currentSceneIndex: number;
  selectedAvatar: string | null;
  completedScenes: number[];
  lastResult: Record<string, SceneResult>;
}

export interface AppProgress {
  learnTopicsRead: Record<string, string>;
  game: GameProgress;
  badges: string[];
}

export interface JournalEntry {
  id: string;
  dateISO: string;
  symptoms: string[];
  notes: string;
  tags: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
  dateISO: string;
}

export interface HypoWareState {
  settings: AppSettings;
  progress: AppProgress;
  journalEntries: JournalEntry[];
  contact: {
    lastMessage: ContactMessage | null;
  };
}

export const STORAGE_KEY = "hypoware_state_v1";
export const TOTAL_GAME_SCENES = 8;
export const ENDING_SCENE_INDEX = TOTAL_GAME_SCENES + 1;

export const defaultHypoWareState: HypoWareState = {
  settings: {
    textScale: 1.15,
    lineHeight: 1.5,
    reduceMotion: false,
    highContrast: false,
  },
  progress: {
    learnTopicsRead: {},
    game: {
      currentSceneIndex: 0,
      selectedAvatar: null,
      completedScenes: [],
      lastResult: {},
    },
    badges: [],
  },
  journalEntries: [],
  contact: {
    lastMessage: null,
  },
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function clampTextScale(value: number): number {
  return Math.min(2, Math.max(0.8, value));
}

function sanitizeLineHeight(value: unknown): LineHeightOption {
  if (value === 1 || value === 1.5 || value === 2) {
    return value;
  }

  return 1.5;
}

function sanitizeGameProgress(value: unknown): GameProgress {
  if (!isRecord(value)) {
    return defaultHypoWareState.progress.game;
  }

  const currentSceneIndexRaw =
    typeof value.currentSceneIndex === "number" ? value.currentSceneIndex : 0;

  const completedScenes = Array.isArray(value.completedScenes)
    ? value.completedScenes
        .filter((item): item is number => typeof item === "number")
        .filter((scene) => scene >= 1 && scene <= TOTAL_GAME_SCENES)
    : [];

  const uniqueCompleted = [...new Set(completedScenes)].sort((a, b) => a - b);

  const lastResult: Record<string, SceneResult> = {};
  if (isRecord(value.lastResult)) {
    for (const [key, result] of Object.entries(value.lastResult)) {
      if (result === "good" || result === "bad") {
        lastResult[key] = result;
      }
    }
  }

  return {
    currentSceneIndex: Math.min(ENDING_SCENE_INDEX, Math.max(0, Math.floor(currentSceneIndexRaw))),
    selectedAvatar:
      typeof value.selectedAvatar === "string" ? value.selectedAvatar : null,
    completedScenes: uniqueCompleted,
    lastResult,
  };
}

function sanitizeJournalEntries(value: unknown): JournalEntry[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter(isRecord)
    .map((entry) => {
      const symptoms = Array.isArray(entry.symptoms)
        ? entry.symptoms.filter((symptom): symptom is string => typeof symptom === "string")
        : [];

      const tags = Array.isArray(entry.tags)
        ? entry.tags.filter((tag): tag is string => typeof tag === "string")
        : [];

      return {
        id: typeof entry.id === "string" ? entry.id : `${Date.now()}-${Math.random()}`,
        dateISO: typeof entry.dateISO === "string" ? entry.dateISO : new Date().toISOString(),
        symptoms,
        notes: typeof entry.notes === "string" ? entry.notes : "",
        tags,
      };
    });
}

export function normalizeHypoWareState(input: unknown): HypoWareState {
  if (!isRecord(input)) {
    return defaultHypoWareState;
  }

  const settingsRaw = isRecord(input.settings) ? input.settings : {};
  const progressRaw = isRecord(input.progress) ? input.progress : {};

  const learnTopicsReadRaw = isRecord(progressRaw.learnTopicsRead)
    ? progressRaw.learnTopicsRead
    : {};

  const learnTopicsRead: Record<string, string> = {};
  for (const [topicId, timestamp] of Object.entries(learnTopicsReadRaw)) {
    if (typeof timestamp === "string") {
      learnTopicsRead[topicId] = timestamp;
    }
  }

  const badgesRaw = Array.isArray(progressRaw.badges)
    ? progressRaw.badges.filter((badge): badge is string => typeof badge === "string")
    : [];

  const contactRaw = isRecord(input.contact) ? input.contact : {};
  const lastMessageRaw = isRecord(contactRaw.lastMessage) ? contactRaw.lastMessage : null;

  return {
    settings: {
      textScale:
        typeof settingsRaw.textScale === "number"
          ? clampTextScale(settingsRaw.textScale)
          : defaultHypoWareState.settings.textScale,
      lineHeight: sanitizeLineHeight(settingsRaw.lineHeight),
      reduceMotion:
        typeof settingsRaw.reduceMotion === "boolean"
          ? settingsRaw.reduceMotion
          : defaultHypoWareState.settings.reduceMotion,
      highContrast:
        typeof settingsRaw.highContrast === "boolean"
          ? settingsRaw.highContrast
          : defaultHypoWareState.settings.highContrast,
    },
    progress: {
      learnTopicsRead,
      game: sanitizeGameProgress(progressRaw.game),
      badges: [...new Set(badgesRaw)],
    },
    journalEntries: sanitizeJournalEntries(input.journalEntries),
    contact: {
      lastMessage:
        lastMessageRaw &&
        typeof lastMessageRaw.name === "string" &&
        typeof lastMessageRaw.email === "string" &&
        typeof lastMessageRaw.message === "string" &&
        typeof lastMessageRaw.dateISO === "string"
          ? {
              name: lastMessageRaw.name,
              email: lastMessageRaw.email,
              message: lastMessageRaw.message,
              dateISO: lastMessageRaw.dateISO,
            }
          : null,
    },
  };
}
