'use client';

import { useEffect, useState } from 'react';
import { Loading, Shell } from '../../components/Shell';
import { describeFailure } from '../../lib/action';
import { api, type Dashboard, type Indicator } from '../../lib/api';
import { useRequireAuth } from '../../lib/session';

function IndicatorRow({ indicator }: { indicator: Indicator }) {
  const value = indicator.value ?? 0;
  const tone = indicator.key === 'risk' ? 'risk' : value >= 70 ? 'good' : 'default';

  return (
    <div className="meter" title={indicator.description}>
      <span className="meter-name">{indicator.label}</span>
      <div className="meter-track">
        <div className="meter-fill" data-tone={tone} style={{ width: `${value}%` }} />
      </div>
      <span className="meter-value">
        {indicator.value == null ? '–' : indicator.value}
      </span>
    </div>
  );
}

export default function PatternsPage() {
  const { user, loading, t } = useRequireAuth();
  const [data, setData] = useState<Dashboard | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    // Swallowed, this rendered an empty card — indistinguishable from having
     // no patterns yet, which is a thing this screen legitimately says. "We
     // could not load it" and "there is nothing here" are different sentences
     // and the person is entitled to know which one they are being told.
    void api
      .get<Dashboard>('/v1/dashboard')
      .then(setData)
      .catch((caught: unknown) => setLoadError(describeFailure(t, caught)));
  }, [user]);

  if (loading || !user) return <Loading />;

  return (
    <Shell title={t('indicator.title')}>
      {loadError ? (
        <div className="error-banner" role="alert">
          {loadError}
        </div>
      ) : null}
      {/* Stated on the page itself, not just in the design doc: there is no
          composite score, and that is a product decision rather than an
          unfinished feature. */}
      <p>{t('indicator.explainer')}</p>

      <div className="card">
        {data?.indicators.map((indicator) => (
          <IndicatorRow key={indicator.key} indicator={indicator} />
        ))}
      </div>

      {data?.indicators.some((i) => i.confidence === 'low' || i.confidence === 'none') ? (
        <p className="muted">{t('common.notEnoughData')}</p>
      ) : null}

      <div className="btn-row" style={{ marginTop: 16 }}>
        <a className="btn" href="/triggers">
          {t('trigger.title')}
        </a>
        <a className="btn" href="/toolbox">
          {t('toolbox.title')}
        </a>
      </div>

      <h2>{t('insight.title')}</h2>
      <p>{t('insight.subtitle')}</p>
      {data?.insights.length ? (
        data.insights.map((insight) => (
          <div className="card" key={insight.id}>
            <p style={{ color: 'var(--text)' }}>{insight.text}</p>
            <span className="pill">{t('indicator.samples', { count: insight.evidence })}</span>
          </div>
        ))
      ) : (
        <p className="muted">{t('common.notEnoughData')}</p>
      )}

      {data?.streak ? (
        <>
          <h2>{t('streak.title')}</h2>
          <div className="stat-grid">
            <div className="stat">
              <div className="value">{data.streak.currentDays}</div>
              <div className="label">{t('streak.current')}</div>
            </div>
            <div className="stat">
              <div className="value">{data.streak.longestDays}</div>
              <div className="label">{t('streak.longest')}</div>
            </div>
            <div className="stat">
              <div className="value">{data.streak.totalDaysInRecovery}</div>
              <div className="label">{t('streak.total')}</div>
            </div>
          </div>
        </>
      ) : null}

      {data?.milestones?.reached.length ? (
        <>
          <h2>{t('milestone.reachedTitle')}</h2>
          <div className="card">
            {data.milestones.reached.map((milestone) => (
              <p key={milestone.key} style={{ color: 'var(--text)' }}>
                {milestone.text}
              </p>
            ))}
          </div>
        </>
      ) : null}
    </Shell>
  );
}
