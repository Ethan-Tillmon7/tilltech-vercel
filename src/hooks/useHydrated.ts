import { useSyncExternalStore } from "react";

const subscribe = () => () => {};

/** false during SSR and hydration, true after. Gates client-only output without a mismatch. */
export function useHydrated() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
