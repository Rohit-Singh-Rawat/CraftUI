import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  window.addEventListener("resize", callback);
  return () => window.removeEventListener("resize", callback);
}

function createGetSnapshot(breakpoint: number) {
  return () => window.innerWidth < breakpoint;
}

function getServerSnapshot() {
  return false;
}

export function useMobile(breakpoint: number = 768): boolean {
  return useSyncExternalStore(
    subscribe,
    createGetSnapshot(breakpoint),
    getServerSnapshot,
  );
}
