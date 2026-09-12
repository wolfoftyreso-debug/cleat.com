'use client';

import { useCallback, useEffect, useState } from 'react';
import { Loading, Shell } from '../../components/Shell';
import { describeFailure, useAction } from '../../lib/action';
import { api } from '../../lib/api';
import { useRequireAuth } from '../../lib/session';

type ChainKey = 'thought' | 'feeling' | 'impulse' | 'action' | 'consequence';

interface Trigger {
  id: string;
  label: string;
  category: string;
  chain: Partial<Record<ChainKey, string>>;
}

interface TriggerView {
  intro: string;
  steps: { key: string; label: string }[];
  triggers: Trigger[];
}

const CHAIN: ChainKey[] = ['thought', 'feeling', 'impulse', 'action', 'consequence'];

/**
 * The trigger map — phase 2 of the recovery model.
 *
 * The point is not collecting triggers. It is making the chain visible: once
 * someone can see trigger → thought → feeling → impulse → action written down,
 * the impulse stops feeling like one inevitable event and starts looking like
 * five links, any of which can be broken.
 */
export default function TriggersPage() {
  const { user, loading, t } = useRequireAuth();
  const [view, setView] = useState<TriggerView | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [label, setLabel] = useState('');
  const [chain, setChain] = useState<Partial<Record<ChainKey, string>>>({});
  const { busy, error, run } = useAction(t);

  const load = useCallback(async () => {
    try {
      setView(await api.get<TriggerView>('/v1/triggers'));
      setLoadError(null);
    } catch (caught) {
      // `setView(null)` on its own rendered the screen as though the person had
      // mapped no triggers at all. That is a real state this screen has, and it
      // is not this one.
      setView(null);
      setLoadError(describeFailure(t, caught));
    }
  }, [t]);

  useEffect(() => {
    if (user) void load();
  }, [user, load]);

  if (loading || !user) return <Loading />;

  async function add() {
    if (!label.trim()) return;
    await api.post('/v1/triggers', { label: label.trim(), chain });
    // Cleared only once the write has landed, so a failed request does not
    // take the text with it.
    setLabel('');
    setChain({});
    await load();
  }

  async function remove(id: string) {
    await api.del(`/v1/triggers/${id}`);
    await load();
  }

  return (
    <Shell title={t('trigger.title')}>
      {error ? <div className="error-banner" role="alert">{error}</div> : null}
      {loadError ? (
        <div className="error-banner" role="alert">
          {loadError}
        </div>
      ) : null}
      <p className="lede">{view?.intro ?? t('trigger.intro')}</p>

      {view?.triggers.length ? (
        view.triggers.map((trigger) => (
          <div className="card" key={trigger.id}>
            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
              <h3>{trigger.label}</h3>
              <button className="pill" onClick={run(() => remove(trigger.id))} disabled={busy}>
                {t('action.delete')}
              </button>
            </div>
            {/* The chain, laid out as a chain. Seeing the links in order is the
                entire therapeutic point of this screen. */}
            <ol className="steps">
              {CHAIN.filter((key) => trigger.chain[key]).map((key) => (
                <li key={key}>
                  <strong style={{ color: 'var(--text-faint)', fontWeight: 600 }}>
                    {t(`trigger.step.${key}`)}:
                  </strong>{' '}
                  {trigger.chain[key]}
                </li>
              ))}
            </ol>
            <p className="muted">{t('trigger.whereToBreak')}</p>
          </div>
        ))
      ) : (
        <p className="muted">{t('trigger.empty')}</p>
      )}

      <h2>{t('trigger.add')}</h2>
      <div className="card">
        <div className="field">
          <label htmlFor="label">{t('trigger.label')}</label>
          <input id="label" value={label} onChange={(event) => setLabel(event.target.value)} />
        </div>
        {CHAIN.map((key) => (
          <div className="field" key={key}>
            <label htmlFor={key}>{t(`trigger.step.${key}`)}</label>
            <input
              id={key}
              value={chain[key] ?? ''}
              onChange={(event) => setChain((c) => ({ ...c, [key]: event.target.value }))}
            />
          </div>
        ))}
        <button className="btn primary wide" onClick={run(add)} disabled={busy || !label.trim()}>
          {t('action.save')}
        </button>
      </div>
    </Shell>
  );
}
