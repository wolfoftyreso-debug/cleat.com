'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Loading, Shell } from '../../components/Shell';
import { api, type CoachResponse, type Dashboard } from '../../lib/api';
import { useRequireAuth } from '../../lib/session';

/**
 * Cleat Now — "I'm struggling".
 *
 * The mode for the hour *before* the craving, which is the hour that actually
 * decides things. By the time Reset is open the decision is already close; this
 * screen exists to catch the drift earlier, when there is still room to change
 * something cheaply.
 *
 * It is deliberately not the craving flow. No safety gate, no intensity slider,
 * no countdown — those would tell someone who is merely wobbling that they are
 * in crisis, which is its own kind of suggestion.
 */
const STATES = [
  'stress',
  'loneliness',
  'anger',
  'boredom',
  'grief',
  'pain',
  'social_pressure',
] as const;

export default function StrugglingPage() {
  const { user, loading, t } = useRequireAuth();
  const [state, setState] = useState<string | null>(null);
  const [reply, setReply] = useState<CoachResponse | null>(null);
  /** Set when the coach could not be reached at all. Not a coach answer. */
  const [offlineNote, setOfflineNote] = useState<string | null>(null);
  const [data, setData] = useState<Dashboard | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    void api.get<Dashboard>('/v1/dashboard').then(setData).catch(() => undefined);
  }, [user]);

  if (loading || !user) return <Loading />;

  async function pick(option: string) {
    setState(option);
    setOfflineNote(null);
    setBusy(true);
    try {
      // The client declares the mode. It knows more than any classifier: this
      // person pressed "I'm struggling", not "I'm craving", and the coach should
      // answer accordingly rather than escalating them into an acute script.
      setReply(
        await api.post<CoachResponse>('/v1/coach/message', {
          message: `${t('now.iAm')} ${t(`feeling.${option}`).toLowerCase()}.`,
          mode: 'general',
        }),
      );
    } catch {
      // This used to be `setReply(null)`: the person pressed "I'm struggling",
      // the request failed, and the place where the coach's answer should have
      // been simply stayed empty with nothing to say why. Silence is the one
      // response this screen must never give — it is reached by somebody who
      // has just reported that they are losing their footing.
      //
      // The three cheapest things below still render, and always did. What was
      // missing was any acknowledgement that the coach had been asked at all.
      // These are the same words the coach itself falls back on.
      //
      // Held separately rather than faked into a CoachResponse: that type
      // carries a safety assessment, and no assessment was made here. Writing
      // `level: 'none'` into it would be the app claiming it had looked at
      // what this person said and found nothing concerning, which is not what
      // happened — nothing reached the server at all.
      setReply(null);
      setOfflineNote(t('coach.offline'));
    } finally {
      setBusy(false);
    }
  }

  const primaryContact =
    data?.supportContacts.find((c) => c.isPrimary) ?? data?.supportContacts[0] ?? null;

  return (
    <Shell title={t('mode.now')}>
      <p className="lede">{t('now.intro')}</p>

      {!state ? (
        <>
          <h2>{t('now.whatIsHappening')}</h2>
          <div className="chips">
            {STATES.map((option) => (
              <button key={option} className="chip" onClick={() => void pick(option)}>
                {t(`feeling.${option}`)}
              </button>
            ))}
          </div>
        </>
      ) : null}

      {busy ? <p className="muted">{t('coach.thinking')}</p> : null}

      {reply ? (
        <div className="card accent">
          <p className="lede" style={{ whiteSpace: 'pre-wrap' }}>
            {reply.reply}
          </p>
        </div>
      ) : null}

      {offlineNote ? (
        <div className="card accent" role="status">
          <p className="lede">{offlineNote}</p>
        </div>
      ) : null}

      {state && !busy ? (
        <>
          {/* The three cheapest things that work, always in the same order, so
              they become muscle memory rather than a menu to evaluate. */}
          <h2>{t('now.cheapest')}</h2>
          <div className="btn-row">
            {primaryContact?.phone ? (
              <a className="btn primary" href={`tel:${primaryContact.phone.replace(/\s/g, '')}`}>
                {t('action.callName', { name: primaryContact.name })}
              </a>
            ) : (
              <Link className="btn" href="/plan#support">
                {t('support.add')}
              </Link>
            )}
            <Link className="btn" href="/coach">
              {t('quick.talk')}
            </Link>
            <Link className="btn" href="/toolbox">
              {t('toolbox.title')}
            </Link>
          </div>

          {data?.profile.whyStatement ? (
            <>
              <h2>{t('why.title')}</h2>
              <div className="card">
                <p className="lede">{data.profile.whyStatement}</p>
              </div>
            </>
          ) : null}

          {/* What has actually worked for this person before — their own
              evidence, not generic advice. */}
          {data?.insights.length ? (
            <>
              <h2>{t('insight.title')}</h2>
              {data.insights.slice(0, 2).map((insight) => (
                <div className="card" key={insight.id}>
                  <p style={{ color: 'var(--text)' }}>{insight.text}</p>
                </div>
              ))}
            </>
          ) : null}

          <div className="spacer" />
          <p className="muted">{t('now.ifItGetsWorse')}</p>
          <Link className="btn primary wide" href="/craving">
            {t('mode.reset')}
          </Link>
        </>
      ) : null}
    </Shell>
  );
}
