import { useCallback, useState } from 'react';
import { ApiError } from './api';

/**
 * Run something that writes, and say so when it fails.
 *
 * The web client grew this helper after every mutation handler there turned out
 * to be written as `try { … } finally { setBusy(false) }` with no `catch`. This
 * app was never given the equivalent, and has the same defect in four places:
 * the check-in, the relapse autopsy, and both writes on the quit-plan screen.
 *
 * That shape looks careful and is not. When the request fails the promise
 * rejects with nobody listening, the spinner stops, and the screen goes back to
 * looking exactly as it did before — with everything the person wrote still on
 * it and nothing to say that none of it was saved. On the relapse screen that
 * is somebody's account of the hardest thing that has happened to them this
 * month, and they do not get a second run at writing it.
 *
 * `run` returns void rather than a promise, which is what a press handler
 * actually wants: React Native discards the return value, so an async function
 * passed straight to `onPress` can only ever produce an unhandled rejection.
 */
export interface Action {
  busy: boolean;
  error: string | null;
  /** Wrap an async operation into a press handler that reports its own failures. */
  run: (operation: () => Promise<unknown>) => () => void;
  /** Clear the banner — for a screen that has moved on. */
  clearError: () => void;
}

/** Codes worth naming; anything else gets the generic message. */
const MESSAGES: Record<string, string> = {
  unavailable: 'common.errorUnavailable',
  rate_limited: 'common.errorRateLimited',
  validation_failed: 'common.errorValidation',
  unauthorized: 'common.errorSignedOut',
};

/** Turn whatever was thrown into something worth showing somebody. */
export function describeFailure(t: (key: string) => string, caught: unknown): string {
  if (caught instanceof ApiError) {
    const key = MESSAGES[caught.code];
    return key ? t(key) : t('common.error');
  }
  // Not an ApiError: the request never reached us. On a phone that is usually
  // signal rather than a fault, and saying so is the difference between "try
  // again in a moment" and "this is broken".
  return t('common.errorOffline');
}

export function useAction(t: (key: string) => string): Action {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(
    (operation: () => Promise<unknown>) => () => {
      setBusy(true);
      setError(null);
      operation()
        .catch((caught: unknown) => setError(describeFailure(t, caught)))
        .finally(() => setBusy(false));
    },
    [t],
  );

  return { busy, error, run, clearError: useCallback(() => setError(null), []) };
}
