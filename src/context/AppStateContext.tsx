"use client";

import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useLocalStorageState } from "@/hooks/useLocalStorageState";
import {
  AppSettings,
  ContactMessage,
  defaultHypoWareState,
  ENDING_SCENE_INDEX,
  GameProgress,
  HypoWareState,
  JournalEntry,
  normalizeHypoWareState,
  SceneResult,
  STORAGE_KEY,
  TOTAL_GAME_SCENES,
} from "@/lib/state";

interface AppStateContextValue {
  state: HypoWareState;
  hydrated: boolean;
  setSettings: (partial: Partial<AppSettings>) => void;
  resetAllData: () => void;
  markLearnTopicRead: (topicId: string) => void;
  updateGame: (updater: (game: GameProgress) => GameProgress) => void;
  recordSceneResult: (sceneIndex: number, result: SceneResult) => void;
  awardBadge: (badge: string) => void;
  addJournalEntry: (entry: JournalEntry) => void;
  setJournalEntries: (entries: JournalEntry[]) => void;
  clearJournalEntries: () => void;
  saveContactMessage: (message: ContactMessage) => void;
}

const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

export function AppStateProvider({ children }: { children: ReactNode }) {
  const { state, setState, hydrated } = useLocalStorageState(
    STORAGE_KEY,
    defaultHypoWareState,
    normalizeHypoWareState,
  );

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--text-scale", String(state.settings.textScale));
    root.style.setProperty("--line-height", String(state.settings.lineHeight));
    root.dataset.reduceMotion = state.settings.reduceMotion ? "true" : "false";
    root.dataset.highContrast = state.settings.highContrast ? "true" : "false";
  }, [state.settings]);

  const setSettings = useCallback((partial: Partial<AppSettings>) => {
    setState((previous) => ({
      ...previous,
      settings: {
        ...previous.settings,
        ...partial,
      },
    }));
  }, [setState]);

  const resetAllData = useCallback(() => {
    setState(defaultHypoWareState);
  }, [setState]);

  const markLearnTopicRead = useCallback((topicId: string) => {
    setState((previous) => ({
      ...previous,
      progress: {
        ...previous.progress,
        learnTopicsRead: {
          ...previous.progress.learnTopicsRead,
          [topicId]: new Date().toISOString(),
        },
      },
    }));
  }, [setState]);

  const updateGame = useCallback((updater: (game: GameProgress) => GameProgress) => {
    setState((previous) => ({
      ...previous,
      progress: {
        ...previous.progress,
        game: updater(previous.progress.game),
      },
    }));
  }, [setState]);

  const recordSceneResult = useCallback((sceneIndex: number, result: SceneResult) => {
    setState((previous) => {
      const completed = new Set(previous.progress.game.completedScenes);
      completed.add(sceneIndex);

      const currentSceneIndex = Math.min(
        ENDING_SCENE_INDEX,
        Math.max(previous.progress.game.currentSceneIndex, sceneIndex),
      );

      return {
        ...previous,
        progress: {
          ...previous.progress,
          game: {
            ...previous.progress.game,
            currentSceneIndex,
            completedScenes: [...completed]
              .filter((scene) => scene >= 1 && scene <= TOTAL_GAME_SCENES)
              .sort((a, b) => a - b),
            lastResult: {
              ...previous.progress.game.lastResult,
              [String(sceneIndex)]: result,
            },
          },
        },
      };
    });
  }, [setState]);

  const awardBadge = useCallback((badge: string) => {
    setState((previous) => {
      if (previous.progress.badges.includes(badge)) {
        return previous;
      }

      return {
        ...previous,
        progress: {
          ...previous.progress,
          badges: [...previous.progress.badges, badge],
        },
      };
    });
  }, [setState]);

  const addJournalEntry = useCallback((entry: JournalEntry) => {
    setState((previous) => ({
      ...previous,
      journalEntries: [entry, ...previous.journalEntries],
    }));
  }, [setState]);

  const setJournalEntries = useCallback((entries: JournalEntry[]) => {
    setState((previous) => ({
      ...previous,
      journalEntries: [...entries],
    }));
  }, [setState]);

  const clearJournalEntries = useCallback(() => {
    setState((previous) => ({
      ...previous,
      journalEntries: [],
    }));
  }, [setState]);

  const saveContactMessage = useCallback((message: ContactMessage) => {
    setState((previous) => ({
      ...previous,
      contact: {
        ...previous.contact,
        lastMessage: message,
      },
    }));
  }, [setState]);

  const value = useMemo<AppStateContextValue>(
    () => ({
      state,
      hydrated,
      setSettings,
      resetAllData,
      markLearnTopicRead,
      updateGame,
      recordSceneResult,
      awardBadge,
      addJournalEntry,
      setJournalEntries,
      clearJournalEntries,
      saveContactMessage,
    }),
    [
      state,
      hydrated,
      setSettings,
      resetAllData,
      markLearnTopicRead,
      updateGame,
      recordSceneResult,
      awardBadge,
      addJournalEntry,
      setJournalEntries,
      clearJournalEntries,
      saveContactMessage,
    ],
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) {
    throw new Error("useAppState must be used inside AppStateProvider");
  }
  return context;
}
