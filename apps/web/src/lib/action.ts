'use client';

import { useCallback, useState } from 'react';
import { ApiError } from './api';

/**
 * Run something that writes, and say so when it fails.
 *
 * Every mutation handler in this app was written as `try { … } finally {
 * setBusy(false) }` with no `catch`. That shape looks careful and is not: when
 * the request fails the promise rejects with nobody listening, the spinner
 * stops, and the screen goes back to looking exactly as it did before. The
 * person is told nothing, and what they wrote is gone.
 *
 * That matters more here than in most products. Somebody typing out why they
 * want to stop, at two in the morning, does not get a second run at that
 * paragraph — and being quietly ignored by the thing you reached for is its own
 * small injury. A save that fails has to say so.
 *
 * `run` also returns void rather than a promise, which is what a DOM handler
 * actually wants: React discards the return value, so an async handler passed
 * straight to `onClick` can only ever produce an unhandled rejection.
 */
export interface Action {
  busy: boolean;
  error: string | null;
  /** Wrap an async operation into a handler that reports its own failures. */
  run: (operation: () => Promise<unknown>) => () => void;
  /** Clear the banner — for a form that has moved on. */
  clearError: () => void;
}

/** Codes worth naming; anything else gets the generic message. */
const MESSAGES: Record<string, string> = {
  unavailable: 'common.errorUnavailable',
  rate_limited: 'common.errorRateLimited',
  validation_failed: 'common.errorValidation',
  unauthorized: 'common.errorSignedOut',
};

/**
 * Turn whatever was thrown into something worth showing somebody.
 *
 * Exported because not every screen fits `run`. Two of them track which
 * *thing* is busy rather than whether anything is, and one wants to keep
 * going with a fallback rather than stop and show a banner — but all of them
 * owe the person the same distinction between "this will work if you try
 * again" and "this will not".
 */
export function describeFailure(t: (key: string) => string, caught: unknown): string {
  if (caught instanceof ApiError) {
    const key = MESSAGES[caught.code];
    return key ? t(key) : t('common.error');
  }
  // Not an ApiError: the request never reached us. On a phone that is usually
  // signal rather than a fault.
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
