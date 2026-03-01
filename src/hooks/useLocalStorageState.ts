"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface UseLocalStorageStateResult<T> {
  state: T;
  setState: Dispatch<SetStateAction<T>>;
  hydrated: boolean;
}

export function useLocalStorageState<T>(
  key: string,
  initialValue: T,
  sanitize?: (value: unknown) => T,
): UseLocalStorageStateResult<T> {
  const [state, setState] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw !== null) {
        const parsed = JSON.parse(raw) as unknown;
        setState(sanitize ? sanitize(parsed) : (parsed as T));
      }
    } catch {
      setState(initialValue);
    } finally {
      setHydrated(true);
    }
  }, [initialValue, key, sanitize]);

  useEffect(() => {
    if (!hydrated) {
      return;
    }

    window.localStorage.setItem(key, JSON.stringify(state));
  }, [hydrated, key, state]);

  return { state, setState, hydrated };
}
