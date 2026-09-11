'use client';

import { useEffect, useState } from 'react';
import { Loading, Shell } from '../../components/Shell';
import { api } from '../../lib/api';
import { useRequireAuth } from '../../lib/session';
import { useAction } from '../../lib/action';

interface Questions {
  opening: string;
  continuity: string;
  safety: { key: string; text: string }[];
  autopsy: { field: string; key: string; text: string }[];
}

interface RelapseResult {
  message: string;
  protectionPlan: {
    warningSigns: string[];
    countermeasures: string[];
    needsWork: boolean;
    tools: { id: string; label: string }[];
  };
  streak: { currentDays: number; longestDays: number; totalDaysInRecovery: number };
}

/**
 * The "I messed up" flow.
 *
 * Safety questions first, autopsy second, and never a word about lost progress.
 * The result screen states outright that the earlier recovery still counts,
 * because that is the sentence that decides whether someone comes back tomorrow.
 */
export default function RelapsePage() {
  const { user, loading, t } = useRequireAuth();
  const [questions, setQuestions] = useState<Questions | null>(null);
  const [stage, setStage] = useState<'safety' | 'autopsy' | 'done'>('safety');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<RelapseResult | null>(null);
  const { busy, error, run } = useAction(t);

  useEffect(() => {
    if (!user) return;
    void api.get<Questions>('/v1/relapse/questions').then(setQuestions).catch(() => undefined);
  }, [user]);

  if (loading || !user || !questions) return <Loading />;

  async function submit() {
    setResult(await api.post<RelapseResult>('/v1/relapse', { autopsy: answers }));
    setStage('done');
  }

  return (
    <Shell title={t('relapse.title')}>
      {error ? <div className="error-banner" role="alert">{error}</div> : null}
      <div className="card accent">
        <p className="lede">{questions.opening}</p>
        <p>{questions.continuity}</p>
      </div>

      {stage === 'safety' ? (
        <>
          <h2>{t('relapse.safety.are_you_safe')}</h2>
          <div className="card">
            {questions.safety.map((question) => (
              <p key={question.key}>{question.text}</p>
            ))}
          </div>
          <div className="btn-row">
            <a className="btn danger wide" href="/craving">
              {t('safety.emergencyTitle')}
            </a>
          </div>
          <div className="spacer" />
          <button className="btn primary wide" onClick={() => setStage('autopsy')}>
            {t('action.continue')}
          </button>
        </>
      ) : null}

      {stage === 'autopsy' ? (
        <>
          <h2>{t('relapse.autopsyTitle')}</h2>
          <p>{t('relapse.autopsyIntro')}</p>
          {questions.autopsy.map((question) => (
            <div className="field" key={question.field}>
              <label htmlFor={question.field}>{question.text}</label>
              <input
                id={question.field}
                value={answers[question.field] ?? ''}
                onChange={(event) =>
                  setAnswers((current) => ({ ...current, [question.field]: event.target.value }))
                }
              />
            </div>
          ))}
          <button className="btn primary wide" onClick={run(submit)} disabled={busy}>
            {t('action.save')}
          </button>
        </>
      ) : null}

      {stage === 'done' && result ? (
        <>
          <div className="card accent">
            <p className="lede">{result.message}</p>
          </div>

          <div className="stat-grid">
            <div className="stat">
              <div className="value">{result.streak.currentDays}</div>
              <div className="label">{t('streak.current')}</div>
            </div>
            <div className="stat">
              <div className="value">{result.streak.longestDays}</div>
              <div className="label">{t('streak.longest')}</div>
            </div>
            <div className="stat">
              <div className="value">{result.streak.totalDaysInRecovery}</div>
              <div className="label">{t('streak.total')}</div>
            </div>
          </div>

          <h2>{t('relapse.planTitle')}</h2>
          {result.protectionPlan.needsWork ? (
            <div className="card">
              <p>{t('relapse.planNeedsWork')}</p>
              <a className="btn primary" href="/coach">
                {t('quick.talk')}
              </a>
            </div>
          ) : null}

          {result.protectionPlan.warningSigns.length ? (
            <div className="card">
              <h3>{t('relapse.planWarnings')}</h3>
              <div className="chips">
                {result.protectionPlan.warningSigns.map((sign) => (
                  <span className="chip" key={sign}>
                    {sign}
                  </span>
                ))}
              </div>
            </div>
          ) : null}

          {result.protectionPlan.countermeasures.length ? (
            <div className="card">
              <h3>{t('relapse.planCountermeasures')}</h3>
              {result.protectionPlan.countermeasures.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </div>
          ) : null}

          <div className="card">
            <h3>{t('toolbox.title')}</h3>
            <div className="chips">
              {result.protectionPlan.tools.map((tool) => (
                <span className="chip" key={tool.id}>
                  {tool.label}
                </span>
              ))}
            </div>
          </div>

          <p className="lede">{t('relapse.nextHour')}</p>
          <a className="btn primary wide" href="/coach">
            {t('quick.talk')}
          </a>
        </>
      ) : null}
    </Shell>
  );
}
