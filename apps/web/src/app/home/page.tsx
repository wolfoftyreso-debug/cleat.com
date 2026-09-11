'use client';

import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import { Loading, Shell } from '../../components/Shell';
import { api, type Dashboard } from '../../lib/api';
import { saveOfflineKit, takeQueuedCravings } from '../../lib/offline';
import { formatHours, formatMoney, useRequireAuth } from '../../lib/session';

export default function HomePage() {
  const { user, loading, t, locale } = useRequireAuth();
  const [data, setData] = useState<Dashboard | null>(null);
  const [error, setError] = useState(false);

  const load = useCallback(async () => {
    try {
      const dashboard = await api.get<Dashboard>('/v1/dashboard');
      setData(dashboard);

      // Refresh the on-device survival kit on every successful load, so the
      // craving flow always has the person's own why and their phone numbers
      // even when the network is gone.
      saveOfflineKit({
        whyStatement: dashboard.profile.whyStatement,
        supportContacts: dashboard.supportContacts.map((c) => ({
          id: c.id,
          name: c.name,
          phone: c.phone,
          isPrimary: c.isPrimary,
        })),
        resources: [],
        locale: dashboard.user.locale,
      });

      // Replay anything logged while offline.
      const queued = takeQueuedCravings();
      for (const entry of queued) {
        await api.post('/v1/cravings', entry).catch(() => undefined);
      }
    } catch {
      setError(true);
    }
  }, []);

  useEffect(() => {
    if (user) void load();
  }, [user, load]);

  if (loading || !user) return <Loading />;

  return (
    <Shell>
      {error ? <div className="error-banner">{t('common.error')}</div> : null}

      {/*
        The screen's heading is the number of days, because that is what the
        screen is about. It used to be a <p>: the home screen — the one somebody
        opens every morning — was the only screen in the product with no heading
        at all, so landing on it announced nothing and there was nothing to
        navigate to.
      */}
      {data?.streak ? (
        <h1 className="daycount">
          <span>{t('common.day')}</span>
          {data.streak.currentDays}
          {data.streak.isPersonalRecord ? (
            <em style={{ display: 'block', fontSize: 13, fontStyle: 'normal', marginTop: 10 }}>
              <span className="pill" data-tone="accent">
                {t('home.personalRecord')}
              </span>
            </em>
          ) : null}
        </h1>
      ) : (
        <div className="card accent">
          <h1 className="card-title">{t('home.noPlanTitle')}</h1>
          <p>{t('home.noPlanBody')}</p>
          <Link className="btn primary" href="/plan">
            {t('home.startHere')}
          </Link>
        </div>
      )}

      {data?.mantra ? <p className="mantra">{data.mantra}</p> : null}

      {/* The medical warning outranks everything else on the screen. For alcohol
          and benzodiazepines it is the single most important thing we can say. */}
      {data?.detoxWarning?.required ? (
        <div className="card warning">
          <span className="pill" data-tone="danger">
            {t('safety.important')}
          </span>
          <p style={{ marginTop: 10 }}>{t(data.detoxWarning.messageKey)}</p>
        </div>
      ) : null}

      {/*
        The five modes, in the order a person in trouble needs them. The two
        acute ones come first and are the largest targets on the screen —
        everything else can wait, and at 2am the scroll is the enemy.
      */}
      <h2>{t('home.quickActions')}</h2>
      <div className="actions">
        <Link className="action primary" href="/craving">
          {t('mode.reset')}
          <em>{t('mode.reset.sub')}</em>
        </Link>
        <Link className="action span" href="/struggling">
          {t('mode.now')}
          <em>{t('mode.now.sub')}</em>
        </Link>
        <Link className="action" href="/plan">
          {t('mode.path')}
          <em>{t('mode.path.sub')}</em>
        </Link>
        <Link className="action" href="/patterns">
          {t('mode.patterns')}
          <em>{t('mode.patterns.sub')}</em>
        </Link>
        <Link className="action span" href="/rebuild">
          {t('mode.rebuild')}
          <em>{t('mode.rebuild.sub')}</em>
        </Link>
      </div>

      <div className="btn-row" style={{ marginTop: 12 }}>
        <Link className="btn" href="/checkin">
          {t('quick.checkIn')}
        </Link>
        <Link className="btn" href="/plan#support">
          {t('quick.callSomeone')}
        </Link>
        <Link className="btn danger-text" href="/relapse">
          {t('quick.messedUp')}
        </Link>
      </div>

      {data?.reclaimed && data.quit ? (
        <>
          <h2>{t('reclaimed.moneyTitle')}</h2>
          <div className="stat-grid">
            <div className="stat">
              <div className="value">
                {formatMoney(data.reclaimed.soFar.moneyMinor, data.reclaimed.currency, locale)}
              </div>
              <div className="label">{t('reclaimed.horizon.soFar')}</div>
            </div>
            <div className="stat">
              <div className="value">{formatHours(data.reclaimed.soFar.minutes)} h</div>
              <div className="label">{t('reclaimed.timeTitle')}</div>
            </div>
            <div className="stat">
              <div className="value">
                {formatMoney(
                  data.reclaimed.projectedYear1.moneyMinor,
                  data.reclaimed.currency,
                  locale,
                )}
              </div>
              <div className="label">{t('reclaimed.horizon.year1')}</div>
            </div>
          </div>
          <p className="muted" style={{ marginTop: 10 }}>
            {t('reclaimed.framing')}
          </p>
        </>
      ) : null}

      {data?.milestones?.next ? (
        <>
          <h2>{t('milestone.nextTitle')}</h2>
          <div className="card">
            <p className="lede" style={{ marginBottom: 12 }}>
              {data.milestones.next.text}
            </p>
            {/* Present only on claims about a body. This product must never
                assert one as though it established it, and somebody reading a
                number about their own heart should be able to check it. */}
            {data.milestones.next.source ? (
              <p style={{ opacity: 0.55, fontSize: '0.85rem', marginBottom: 12 }}>
                {t('milestone.source', { source: data.milestones.next.source })}
              </p>
            ) : null}
            <div className="meter-track">
              <div
                className="meter-fill"
                style={{ width: `${Math.round(data.milestones.progressToNext * 100)}%` }}
              />
            </div>
          </div>
        </>
      ) : null}

      {data?.insights?.length ? (
        <>
          <h2>{t('insight.title')}</h2>
          {data.insights.slice(0, 2).map((insight) => (
            <div className="card" key={insight.id}>
              <p style={{ color: 'var(--text)' }}>{insight.text}</p>
              <span className="pill">{t('indicator.samples', { count: insight.evidence })}</span>
            </div>
          ))}
        </>
      ) : null}

      {data?.phase ? (
        <>
          <h2>{data.phase.label}</h2>
          <div className="card">
            <p>{data.phase.reason}</p>
            <div className="chips">
              {data.phase.focus.map((focus) => (
                <span className="chip" key={focus.key}>
                  {focus.label}
                </span>
              ))}
            </div>
          </div>
        </>
      ) : null}
    </Shell>
  );
}
