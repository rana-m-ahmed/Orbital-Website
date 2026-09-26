"use client";
import { useSyncExternalStore } from "react";
const subscribe = () => () => {};
/** Prevents native form submission before React has attached event handlers. */
export function useHydrated() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}
