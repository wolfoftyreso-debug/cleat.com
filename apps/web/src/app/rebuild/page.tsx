'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loading, Shell } from '../../components/Shell';
import { describeFailure } from '../../lib/action';
import { api } from '../../lib/api';
import { useRequireAuth } from '../../lib/session';

type Status = 'untouched' | 'working' | 'steady';

interface Domain {
  id: string;
  dimension: string;
  label: string;
  description: string;
  status: Status;
  statusLabel: string;
  note: string | null;
}

interface RebuildView {
  intro: string;
  pickOne: string;
  phase: string;
  progress: { steady: number; working: number; untouched: number; total: number };
  suggestion: { domain: string; label: string; reason: string } | null;
  domains: Domain[];
  locked: { id: string; label: string }[];
}

/**
 * Rebuild my life — the fifth mode, and the one the product is actually about.
 *
 * Stopping is the beginning. This screen is the part that means someone does not
 * have to start again. It shows one suggestion rather than a ranked list of
 * everything that is broken: a person rebuilding after addiction is already
 * looking at the whole wreck, and the job here is to point at the next thing.
 */
export default function RebuildPage() {
  const { user, loading, t } = useRequireAuth();
  const [view, setView] = useState<RebuildView | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setView(await api.get<RebuildView>('/v1/rebuild'));
    } catch {
      setView(null);
    }
  }, []);

  useEffect(() => {
    if (user) void load();
  }, [user, load]);

  if (loading || !user) return <Loading />;

  async function setStatus(domain: string, status: Status) {
    setBusy(domain);
    setError(null);
    try {
      await api.put(`/v1/rebuild/${domain}`, { status });
      await load();
    } catch (caught) {
      // try/finally with no catch: marking a part of your life as one you are
      // working on rejected with nobody listening, the chip stopped spinning,
      // and it stayed exactly as it was. The next thing somebody does after
      // that is press it again.
      setError(describeFailure(t, caught));
    } finally {
      setBusy(null);
    }
  }

  const cycle: Record<Status, Status> = {
    untouched: 'working',
    working: 'steady',
    steady: 'untouched',
  };

  return (
    <Shell title={t('rebuild.title')}>
      {error ? (
        <div className="error-banner" role="alert">
          {error}
        </div>
      ) : null}
      <p className="lede">{view?.intro ?? t('rebuild.intro')}</p>

      {view?.suggestion ? (
        <div className="card accent">
          <span className="pill" data-tone="accent">
            {t('rebuild.pickOne')}
          </span>
          <h3 style={{ marginTop: 10 }}>{view.suggestion.label}</h3>
          <p>{view.suggestion.reason}</p>
          <button
            className="btn primary"
            onClick={() => void setStatus(view.suggestion!.domain, 'working')}
            disabled={busy === view.suggestion.domain}
          >
            {t('rebuild.status.working')}
          </button>
        </div>
      ) : null}

      {view ? (
        <p className="muted">
          {view.progress.steady} / {view.progress.total} {t('rebuild.status.steady').toLowerCase()}
          {view.progress.working > 0
            ? ` · ${view.progress.working} ${t('rebuild.status.working').toLowerCase()}`
            : ''}
        </p>
      ) : null}

      {view?.domains.map((domain) => (
        <div className="card" key={domain.id}>
          <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
            <h3>{domain.label}</h3>
            <button
              className="pill"
              data-tone={domain.status === 'steady' ? 'accent' : undefined}
              onClick={() => void setStatus(domain.id, cycle[domain.status])}
              disabled={busy === domain.id}
            >
              {domain.statusLabel}
            </button>
          </div>
          <p>{domain.description}</p>
          {domain.id === 'relationships' && domain.status !== 'untouched' ? (
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: 12, marginTop: 4 }}>
              <p className="muted">{t('rebuild.relationships.q1')}</p>
              <p className="muted">{t('rebuild.relationships.q2')}</p>
              <p className="muted">{t('rebuild.relationships.q3')}</p>
              <p className="muted">{t('rebuild.relationships.q4')}</p>
              <p style={{ color: 'var(--text)' }}>{t('rebuild.relationships.lesson')}</p>
            </div>
          ) : null}
        </div>
      ))}

      {/* Locked domains are shown rather than hidden: nothing is being kept from
          the person, it is just not realistic yet at this phase. */}
      {view?.locked.length ? (
        <>
          <h2>{t('rebuild.lockedTitle')}</h2>
          <p className="muted">{t('rebuild.lockedBody')}</p>
          <div className="chips">
            {view.locked.map((domain) => (
              <span className="chip" key={domain.id} style={{ opacity: 0.5 }}>
                {domain.label}
              </span>
            ))}
          </div>
        </>
      ) : null}

      <div className="spacer" />
      <p className="muted">{t('about.objective')}</p>
    </Shell>
  );
}
