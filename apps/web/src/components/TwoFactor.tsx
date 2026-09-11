'use client';

import { useEffect, useState } from 'react';
import { api, ApiError, type TotpEnabled, type TotpSetup, type TotpStatus } from '../lib/api';
import { useSession } from '../lib/session';

/**
 * Turning on a second factor, and turning it off again.
 *
 * Enrolment is two steps on purpose: a secret is issued and shown, and nothing
 * is switched on until the person has proved they can produce a code from it.
 * Enabling on the first request would lock people out of their own accounts
 * every time a code was mistyped or a clock was wrong — and losing an account
 * here means losing the record of the hardest thing somebody has done, which is
 * a worse outcome than the one the second factor is protecting against.
 *
 * For the same reason the recovery codes are given a screen of their own and
 * cannot be dismissed by accident. They are shown exactly once.
 */
export function TwoFactor() {
  const { t } = useSession();
  const [status, setStatus] = useState<TotpStatus | null>(null);
  const [setup, setSetup] = useState<TotpSetup | null>(null);
  const [codes, setCodes] = useState<string[] | null>(null);
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function reload() {
    setStatus(await api.get<TotpStatus>('/v1/auth/totp'));
  }

  useEffect(() => {
    void reload().catch(() => undefined);
  }, []);

  function fail(caught: unknown) {
    const map: Record<string, string> = {
      totp_invalid: 'auth.totpWrongCode',
      totp_not_started: 'auth.totpNotStarted',
      totp_already_enabled: 'auth.totpAlreadyOn',
      unauthorized: 'auth.invalid',
    };
    setError(caught instanceof ApiError ? t(map[caught.code] ?? 'common.error') : t('common.error'));
  }

  async function begin() {
    setBusy(true);
    setError(null);
    try {
      setSetup(await api.post<TotpSetup>('/v1/auth/totp/setup', {}));
    } catch (caught) {
      fail(caught);
    } finally {
      setBusy(false);
    }
  }

  async function enable() {
    setBusy(true);
    setError(null);
    try {
      const result = await api.post<TotpEnabled>('/v1/auth/totp/enable', { code });
      setCodes(result.recoveryCodes);
      setSetup(null);
      setCode('');
      await reload();
    } catch (caught) {
      fail(caught);
    } finally {
      setBusy(false);
    }
  }

  async function disable() {
    setBusy(true);
    setError(null);
    try {
      await api.post('/v1/auth/totp/disable', { password });
      setPassword('');
      await reload();
    } catch (caught) {
      fail(caught);
    } finally {
      setBusy(false);
    }
  }

  if (!status) return null;

  // Shown once, immediately after enrolment. Nothing else is on screen, because
  // this is the only moment these exist.
  if (codes) {
    return (
      <>
        <h2>{t('auth.totpRecoveryTitle')}</h2>
        <div className="card warning">
          <p>{t('auth.totpRecoveryBody')}</p>
          <ul className="recovery-codes">
            {codes.map((value) => (
              <li key={value}>
                <code>{value}</code>
              </li>
            ))}
          </ul>
          <button
            className="btn wide"
            onClick={() => {
              const blob = new Blob([codes.join('\n')], { type: 'text/plain' });
              const url = URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = 'cleat-recovery-codes.txt';
              link.click();
              URL.revokeObjectURL(url);
            }}
          >
            {t('auth.totpRecoveryDownload')}
          </button>
          <button className="btn primary wide" onClick={() => setCodes(null)}>
            {t('auth.totpRecoverySaved')}
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <h2>{t('auth.totpTitle')}</h2>

      {status.enabled ? (
        <div className="card">
          <p>
            <span className="pill" data-tone="accent">
              {t('auth.totpOn')}
            </span>
          </p>
          <p className="muted">
            {t('auth.totpCodesLeft', { count: status.recoveryCodesRemaining })}
          </p>
          {error ? <div className="error-banner" role="alert">{error}</div> : null}
          {/* The password, not just a session: otherwise a borrowed access
              token could take the second factor off and then use the account
              freely, which would make it protection that any attacker who
              already got in can simply remove. */}
          <div className="field">
            <label htmlFor="totp-password">{t('auth.totpDisablePassword')}</label>
            <input
              id="totp-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              autoComplete="current-password"
            />
          </div>
          <button className="btn wide" onClick={() => void disable()} disabled={busy || !password}>
            {t('auth.totpDisable')}
          </button>
        </div>
      ) : setup ? (
        <div className="card">
          <p>{t('auth.totpSetupBody')}</p>
          {/* The key in text, not only a QR code. A QR code is unreadable to a
              screen reader and useless to somebody whose authenticator is on
              the same device as this page. */}
          <p className="muted">{t('auth.totpSecretLabel')}</p>
          <p>
            <code className="totp-secret">{setup.secret}</code>
          </p>
          {error ? <div className="error-banner" role="alert">{error}</div> : null}
          <div className="field">
            <label htmlFor="totp-code">{t('auth.totpCode')}</label>
            <input
              id="totp-code"
              inputMode="numeric"
              autoComplete="one-time-code"
              value={code}
              onChange={(event) => setCode(event.target.value)}
            />
          </div>
          <button className="btn primary wide" onClick={() => void enable()} disabled={busy || code.length < 6}>
            {t('auth.totpConfirm')}
          </button>
          <button className="btn wide" onClick={() => setSetup(null)} disabled={busy}>
            {t('common.cancel')}
          </button>
        </div>
      ) : (
        <div className="card">
          <p>{t('auth.totpOffBody')}</p>
          {error ? <div className="error-banner" role="alert">{error}</div> : null}
          <button className="btn wide" onClick={() => void begin()} disabled={busy}>
            {t('auth.totpEnable')}
          </button>
        </div>
      )}
    </>
  );
}
