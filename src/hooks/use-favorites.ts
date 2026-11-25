import { useCallback, useEffect, useState } from "react";

/** Favorites saved on this device. Read after mount to keep server and browser output identical. */
export function useFavorites(key: string) {
  const storageKey = `vibetrip:favorites:${key}`;
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(storageKey);
      if (raw) setFavorites(JSON.parse(raw));
    } catch {
      /* ignore unreadable storage */
    }
  }, [storageKey]);

  const toggle = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id];
        try {
          window.localStorage.setItem(storageKey, JSON.stringify(next));
        } catch {
          /* ignore */
        }
        return next;
      });
    },
    [storageKey],
  );

  return { favorites, toggle, isFavorite: (id: string) => favorites.includes(id) };
}
