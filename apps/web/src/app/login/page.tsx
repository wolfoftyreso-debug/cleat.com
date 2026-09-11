'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState, type FormEvent } from 'react';
import { ApiError } from '../../lib/api';
import { useSession } from '../../lib/session';

export default function LoginPage() {
  const { t, signIn, completeMfa, signUp, user, loading } = useSession();
  const router = useRouter();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  /** Set once the password was accepted and a second factor is still owed. */
  const [challenge, setChallenge] = useState<string | null>(null);
  const [code, setCode] = useState('');

  useEffect(() => {
    if (!loading && user) router.replace('/home');
  }, [loading, user, router]);

  function describe(caught: unknown): string {
    if (!(caught instanceof ApiError)) return t('common.error');
    const map: Record<string, string> = {
      weak_password: 'auth.weakPassword',
      email_taken: 'auth.emailTaken',
      unauthorized: 'auth.invalid',
    };
    return t(map[caught.code] ?? 'common.error');
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    try {
      if (mode === 'signUp') {
        await signUp(email, password, displayName);
      } else {
        const outcome = await signIn(email, password);
        if (outcome.status === 'mfa-required') {
          setChallenge(outcome.challenge);
          // The password is no longer needed and should not sit in memory
          // waiting for a code that may take a minute to arrive.
          setPassword('');
        }
      }
    } catch (caught) {
      setError(describe(caught));
    } finally {
      setBusy(false);
    }
  }

  async function submitCode(event: FormEvent) {
    event.preventDefault();
    if (!challenge) return;
    setBusy(true);
    setError(null);
    try {
      await completeMfa(challenge, code);
    } catch (caught) {
      // A wrong code is not the end of the attempt: the server allows five, and
      // throwing somebody back to re-enter their password over one mistyped
      // digit is how a protective control becomes a reason to switch it off.
      // Only a challenge that can no longer succeed sends them back.
      const dead = caught instanceof ApiError && caught.code === 'totp_challenge_expired';
      if (dead) {
        setError(t('auth.totpChallengeExpired'));
        setChallenge(null);
        setCode('');
      } else if (caught instanceof ApiError && caught.code === 'totp_invalid_code') {
        setError(t('auth.totpWrongCode'));
        setCode('');
      } else {
        setError(describe(caught));
      }
    } finally {
      setBusy(false);
    }
  }

  if (challenge) {
    return (
      <main className="shell">
        <header className="topbar">
          <span className="wordmark">{t('app.name')}</span>
        </header>

        <h1>{t('auth.totpTitle')}</h1>
        <p className="lede">{t('auth.totpPrompt')}</p>

        <div className="spacer" />

        <form onSubmit={(e) => { e.preventDefault(); void submitCode(e); }} className="card">
          {error ? <div className="error-banner" role="alert">{error}</div> : null}
          <div className="field">
            <label htmlFor="code">{t('auth.totpCode')}</label>
            <input
              id="code"
              required
              value={code}
              onChange={(event) => setCode(event.target.value)}
              // Not type="number": recovery codes contain letters, and a
              // numeric input silently strips them.
              inputMode="text"
              autoComplete="one-time-code"
              autoFocus
            />
          </div>
          <button className="btn primary wide" type="submit" disabled={busy}>
            {busy ? t('common.loading') : t('auth.signIn')}
          </button>
        </form>

        <p className="center muted">{t('auth.totpRecoveryHint')}</p>

        <p className="center">
          <button
            type="button"
            className="pill"
            onClick={() => {
              setChallenge(null);
              setCode('');
              setError(null);
            }}
          >
            {t('common.back')}
          </button>
        </p>

        <div className="spacer" />
        <p className="muted center">{t('safety.disclaimer')}</p>
      </main>
    );
  }

  return (
    <main className="shell">
      <header className="topbar">
        <span className="wordmark">{t('app.name')}</span>
      </header>

      <h1>{t('app.tagline')}</h1>
      <p className="lede">{t('app.subtitle')}</p>

      <div className="spacer" />

      <form onSubmit={(e) => { e.preventDefault(); void submit(e); }} className="card">
        {error ? <div className="error-banner" role="alert">{error}</div> : null}

        {mode === 'signUp' ? (
          <div className="field">
            <label htmlFor="displayName">{t('auth.displayName')}</label>
            <input
              id="displayName"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              autoComplete="nickname"
            />
          </div>
        ) : null}

        <div className="field">
          <label htmlFor="email">{t('auth.email')}</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            autoComplete="email"
          />
        </div>

        <div className="field">
          <label htmlFor="password">{t('auth.password')}</label>
          <input
            id="password"
            type="password"
            required
            minLength={mode === 'signUp' ? 12 : undefined}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete={mode === 'signUp' ? 'new-password' : 'current-password'}
          />
        </div>

        <button className="btn primary wide" type="submit" disabled={busy}>
          {busy ? t('common.loading') : t(mode === 'signIn' ? 'auth.signIn' : 'auth.signUp')}
        </button>
      </form>

      {/* The way back into an account. Without it, forgetting a password means
          losing the record of the hardest thing somebody has done — and the
          endpoint that recovers it has existed all along with nothing pointing
          at it. Sign-in side only: offered while creating an account it would
          read as a warning that you have already failed. */}
      {mode === 'signIn' ? (
        <p className="center">
          <Link className="pill" href="/forgot">
            {t('auth.forgotPassword')}
          </Link>
        </p>
      ) : null}

      <p className="center muted">
        {t(mode === 'signIn' ? 'auth.noAccount' : 'auth.haveAccount')}{' '}
        <button
          type="button"
          className="pill"
          data-tone="accent"
          onClick={() => {
            setMode(mode === 'signIn' ? 'signUp' : 'signIn');
            setError(null);
          }}
        >
          {t(mode === 'signIn' ? 'auth.signUp' : 'auth.signIn')}
        </button>
      </p>

      <div className="spacer" />
      <p className="muted center">{t('safety.disclaimer')}</p>
    </main>
  );
}
