'use client';

import { useEffect, useState } from 'react';
import { Loading, Shell } from '../../components/Shell';
import { TwoFactor } from '../../components/TwoFactor';
import { api, ApiError, tokens, type PrivacySummary } from '../../lib/api';
import { useRequireAuth } from '../../lib/session';
import { useAction } from '../../lib/action';

export default function SettingsPage() {
  const { user, loading, t, signOut, refreshUser } = useRequireAuth();
  const [confirm, setConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const { busy, error, run } = useAction(t);
  const [message, setMessage] = useState<string | null>(null);
  const [summary, setSummary] = useState<PrivacySummary | null>(null);

  useEffect(() => {
    if (!user) return;
    void api
      .get<PrivacySummary>('/v1/privacy/summary')
      .then(setSummary)
      // A transparency panel that cannot load must not take the delete button
      // down with it; the rest of this screen matters more.
      .catch(() => setSummary(null));
  }, [user]);

  if (loading || !user) return <Loading />;

  async function setLocale(locale: 'sv' | 'en') {
    await api.patch('/v1/me', { locale });
    await refreshUser();
  }

  async function setCountry(country: string) {
    await api.patch('/v1/me', { country });
    await refreshUser();
  }

  async function exportData() {
    const data = await api.get<unknown>('/v1/privacy/export');
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'cleat-export.json';
    link.click();
    URL.revokeObjectURL(url);
    setMessage(t('privacy.exportDone'));
  }

  /**
   * Erasure, with the password the server actually asks for.
   *
   * This screen used to send the confirmation word alone. The endpoint has
   * always required the password as well — it re-authenticates, because an
   * access token lifted from an unlocked phone should not be able to destroy
   * somebody's entire record — so the only button in the product that exercises
   * the right to erasure returned 400 every single time it was pressed. The API
   * tests passed throughout: they called the endpoint correctly, which the app
   * did not.
   *
   * It also handles its own errors rather than going through `useAction`: a
   * wrong password comes back as `unauthorized`, and the generic handler reads
   * that as "you have been signed out", which is both untrue and alarming on
   * this particular screen.
   */
  async function deleteAccount() {
    setDeleteError(null);
    try {
      await api.del('/v1/privacy/account', { confirm, password });
      tokens.clear();
      window.location.href = '/login';
    } catch (caught) {
      setDeleteError(
        caught instanceof ApiError && caught.status === 401
          ? t('privacy.deleteWrongPassword')
          : t('common.error'),
      );
    }
  }

  const deleteWord = t('privacy.deleteWord');

  return (
    <Shell title={t('settings.title')}>
      {/* Not the red banner. Taking your own data out of a product about your
          drinking is the one thing here that should never look like something
          went wrong — and role="status" rather than "alert", because it is
          good news and can wait for a gap in what is being read. */}
      {message ? (
        <div className="notice-banner" role="status">
          {message}
        </div>
      ) : null}
      {error ? <div className="error-banner" role="alert">{error}</div> : null}

      <h2>{t('settings.language')}</h2>
      <div className="chips">
        <button
          className="chip"
          data-selected={user.locale === 'sv'}
          onClick={run(() => setLocale('sv'))}
        >
          {t('settings.language.sv')}
        </button>
        <button
          className="chip"
          data-selected={user.locale === 'en'}
          onClick={run(() => setLocale('en'))}
        >
          {t('settings.language.en')}
        </button>
      </div>

      <h2>{t('settings.country')}</h2>
      <div className="chips">
        {['SE', 'US', 'GB'].map((code) => (
          <button
            key={code}
            className="chip"
            data-selected={user.country === code}
            onClick={run(() => setCountry(code))}
          >
            {code}
          </button>
        ))}
      </div>

      <TwoFactor />

      <h2>{t('privacy.title')}</h2>
      <div className="card">
        <p>{t('privacy.principles')}</p>
        <button className="btn wide" onClick={run(exportData)} disabled={busy}>
          {t('privacy.export')}
        </button>
      </div>

      {/* Counted from the database rather than described in prose. "We minimise
          collection" is a claim; a list saying 14 check-ins and 3 cravings is
          something a person can check. The endpoint computing it has existed
          since the privacy routes were written and nothing had ever shown it.

          The sharing answers come from the server too, deliberately. A client
          that hard-codes "we never sell your data" keeps saying so even in a
          deployment that does — which would make this app the thing telling the
          reassuring lie. */}
      {summary ? (
        <>
          <h3>{t('privacy.storedTitle')}</h3>
          <div className="card">
            {summary.whatWeStore.map((row) => (
              <div className="resource" key={row.category}>
                <span>{t(`privacy.category.${row.category}`)}</span>
                <span className="muted">{row.count}</span>
              </div>
            ))}
          </div>

          <h3>{t('privacy.sharingTitle')}</h3>
          <div className="card">
            {(Object.keys(summary.sharing) as (keyof PrivacySummary['sharing'])[]).map((key) => (
              <div className="resource" key={key}>
                <span>{t(`privacy.sharing.${key}`)}</span>
                <span className={summary.sharing[key] ? '' : 'muted'}>
                  {t(summary.sharing[key] ? 'privacy.sharing.yes' : 'privacy.sharing.no')}
                </span>
              </div>
            ))}
          </div>
        </>
      ) : null}

      {/* Deletion is a first-class control, not a support ticket. Recovery data
          in the wrong hands costs people jobs and custody. */}
      <div className="card warning">
        <h3>{t('privacy.delete')}</h3>
        <p>{t('privacy.deleteConfirm')}</p>
        {deleteError ? <div className="error-banner" role="alert">{deleteError}</div> : null}
        <div className="field">
          <label htmlFor="delete-confirm">{deleteWord}</label>
          <input
            id="delete-confirm"
            value={confirm}
            onChange={(event) => setConfirm(event.target.value)}
            placeholder={deleteWord}
          />
        </div>
        <div className="field">
          <label htmlFor="delete-password">{t('privacy.deletePassword')}</label>
          <input
            id="delete-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
          />
        </div>
        <p className="muted">{t('privacy.deletePasswordWhy')}</p>
        <button
          className="btn wide"
          onClick={run(deleteAccount)}
          disabled={busy || confirm !== deleteWord || password.length === 0}
        >
          {t('action.delete')}
        </button>
      </div>

      <div className="spacer" />
      <button className="btn wide" onClick={run(signOut)}>
        {t('auth.signOut')}
      </button>

      <div className="spacer" />
      <p className="muted">{t('safety.disclaimer')}</p>
    </Shell>
  );
}
