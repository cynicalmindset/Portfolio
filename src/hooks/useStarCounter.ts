import { useCallback, useEffect, useState } from 'react';
import { useToast } from '../context/ToastContext';

// Free, no-auth counter service (https://counterapi.dev) — the count lives on their
// server, not ours, so it's a real shared count across visitors. Anyone who knows the
// workspace/counter name could technically hit the API directly, so treat this as a
// fun "does this land" signal rather than a tamper-proof metric.
const WORKSPACE = 'yash-g-portfolio';
const COUNTER = 'star';
const BASE = `https://api.counterapi.dev/v1/${WORKSPACE}/${COUNTER}`;
const STORAGE_KEY = `starred:${WORKSPACE}:${COUNTER}`;

function readStarredFlag(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function writeStarredFlag(value: boolean) {
  try {
    localStorage.setItem(STORAGE_KEY, value ? '1' : '0');
  } catch {
    // storage unavailable — the toggle still works for this visit, just won't persist
  }
}

export function useStarCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [starred, setStarred] = useState<boolean>(readStarredFlag);
  const [pending, setPending] = useState(false);
  const showToast = useToast();

  useEffect(() => {
    let cancelled = false;
    fetch(`${BASE}/`)
      .then((res) => (res.ok ? (res.json() as Promise<{ count: number }>) : Promise.reject(new Error(String(res.status)))))
      .then((data) => {
        if (!cancelled) setCount(data.count);
      })
      .catch(() => {
        if (!cancelled) setCount(null);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const toggle = useCallback(async () => {
    if (pending) return;
    const next = !starred;
    const prevCount = count;

    setPending(true);
    setStarred(next);
    setCount((c) => (c === null ? c : c + (next ? 1 : -1)));

    try {
      const res = await fetch(`${BASE}/${next ? 'up' : 'down'}`);
      if (!res.ok) throw new Error(String(res.status));
      const data = (await res.json()) as { count: number };
      setCount(data.count);
      writeStarredFlag(next);
    } catch {
      setStarred(!next);
      setCount(prevCount);
      showToast("couldn't save your star — try again");
    } finally {
      setPending(false);
    }
  }, [pending, starred, count, showToast]);

  return { count, starred, pending, toggle };
}
