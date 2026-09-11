'use client';

import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { api, ApiError } from '../../lib/api';
import { useSession } from '../../lib/session';

/**
 * Where the reset link lands.
 *
 * The mail has always pointed at `/reset?token=…` on the web client, and this
 * page did not exist: every password reset this product could send arrived at a
 * 404. The endpoint, the token store, the expiry, the single-use rule and the
 * session revocation were all built and tested.
 *
 * The token is read from `location.search` rather than through
 * `useSearchParams`, which would force this page out of the static prerender
 * for no gain. It is deliberately never put in state that outlives the submit,
 * and never logged: for its two hours it is a key to the account.
 */
export default function ResetPasswordPage() {
  const { t } = useSession();
  const [token, setToken] = useState<string | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setToken(new URLSearchParams(window.location.search).get('token'));
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!token) return;
    setBusy(true);
    setError(null);
    try {
      await api.post('/v1/auth/reset-password', { token, password });
      setDone(true);
      setPassword('');
    } catch (caught) {
      const code = caught instanceof ApiError ? caught.code : '';
      setError(
        code === 'weak_password'
          ? t('auth.weakPassword')
          : code === 'invalid_token'
            ? t('auth.resetInvalid')
            : t('common.error'),
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="shell">
      <header className="topbar">
        <span className="wordmark">{t('app.name')}</span>
      </header>

      <h1>{t('auth.resetTitle')}</h1>

      {done ? (
        <>
          <div className="card accent">
            <p className="lede">{t('auth.resetDone')}</p>
          </div>
          <Link className="btn primary wide" href="/login">
            {t('auth.signIn')}
          </Link>
        </>
      ) : token === null ? (
        // Null before the effect has run and after it found nothing; both cases
        // want the same screen, and it is one render apart.
        <>
          <p className="lede">{t('auth.resetNoToken')}</p>
          <Link className="btn wide" href="/forgot">
            {t('auth.forgotTitle')}
          </Link>
        </>
      ) : (
        <>
          <p className="lede">{t('auth.resetBody')}</p>
          <div className="spacer" />
          <form onSubmit={(event) => void submit(event)} className="card">
            {error ? <div className="error-banner" role="alert">{error}</div> : null}
            <div className="field">
              <label htmlFor="password">{t('auth.resetNewPassword')}</label>
              <input
                id="password"
                type="password"
                required
                minLength={12}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="new-password"
                autoFocus
              />
            </div>
            <button className="btn primary wide" type="submit" disabled={busy || !password}>
              {busy ? t('common.loading') : t('auth.resetSave')}
            </button>
          </form>
          <p className="center">
            <Link className="pill" href="/login">
              {t('auth.backToSignIn')}
            </Link>
          </p>
        </>
      )}

      <div className="spacer" />
      <p className="muted center">{t('safety.disclaimer')}</p>
    </main>
  );
}
