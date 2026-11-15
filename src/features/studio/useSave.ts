"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SaveResult } from "./types";

// Shared save flow for both editors: validate in the browser for quick
// feedback, call the server action (which validates again), then refresh the
// server-rendered lists.
export function useSave<T>(
  validate: (item: T) => string | null,
  save: (item: T) => Promise<SaveResult>,
  onMessage: (message: string) => void,
) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function run(item: T): Promise<boolean> {
    if (busy) return false;
    const error = validate(item);
    if (error) {
      onMessage(error);
      return false;
    }
    setBusy(true);
    try {
      const result = await save(item);
      onMessage(result.message);
      if (result.ok) router.refresh();
      return result.ok;
    } catch {
      onMessage("Could not reach the server. Check your connection and retry.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  return { busy, run };
}
