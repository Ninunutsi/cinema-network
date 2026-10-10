import { useCallback, useMemo, useSyncExternalStore } from "react";

const LOCAL_STORAGE_EVENT = "local-storage";

type StorageEventDetail = { key: string };

type SetValue<T> = (value: T | ((previous: T) => T)) => void;

export interface UseLocalStorageOptions<T> {
  serialize?: (value: T) => string;
  deserialize?: (raw: string) => T;
}

function readRaw(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

function writeRaw(key: string, raw: string | null): void {
  try {
    if (raw === null) {
      window.localStorage.removeItem(key);
    } else {
      window.localStorage.setItem(key, raw);
    }
  } catch (error) {
    console.warn(`useLocalStorage: could not write key "${key}"`, error);
    return;
  }

  window.dispatchEvent(
    new CustomEvent<StorageEventDetail>(LOCAL_STORAGE_EVENT, {
      detail: { key },
    }),
  );
}

function subscribeToKey(key: string, onChange: () => void): () => void {
  const handleNativeEvent = (event: StorageEvent) => {
    if (event.key === key || event.key === null) onChange();
  };

  const handleCustomEvent = (event: Event) => {
    if ((event as CustomEvent<StorageEventDetail>).detail.key === key)
      onChange();
  };

  window.addEventListener("storage", handleNativeEvent);
  window.addEventListener(LOCAL_STORAGE_EVENT, handleCustomEvent);

  return () => {
    window.removeEventListener("storage", handleNativeEvent);
    window.removeEventListener(LOCAL_STORAGE_EVENT, handleCustomEvent);
  };
}

export function useLocalStorage<T>(
  key: string,
  initialValue: T,
  options: UseLocalStorageOptions<T> = {},
): readonly [value: T, setValue: SetValue<T>, remove: () => void] {
  const { serialize = JSON.stringify, deserialize = JSON.parse } = options;

  const raw = useSyncExternalStore(
    useCallback((onChange) => subscribeToKey(key, onChange), [key]),
    () => readRaw(key),
    () => null,
  );

  const value = useMemo<T>(() => {
    if (raw === null) return initialValue;
    try {
      return deserialize(raw) as T;
    } catch {
      return initialValue;
    }
  }, [raw, initialValue, deserialize]);

  const setValue = useCallback<SetValue<T>>(
    (next) => {
      const currentRaw = readRaw(key);
      let current = initialValue;
      if (currentRaw !== null) {
        try {
          current = deserialize(currentRaw) as T;
        } catch {
          /* keep initialValue */
        }
      }

      const resolved = next instanceof Function ? next(current) : next;
      writeRaw(key, serialize(resolved));
    },
    [key, initialValue, serialize, deserialize],
  );

  const remove = useCallback(() => writeRaw(key, null), [key]);

  return [value, setValue, remove] as const;
}
