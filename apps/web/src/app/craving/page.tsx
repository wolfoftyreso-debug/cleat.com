'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { CRAVING_FEELINGS, CRAVING_LOCATIONS } from '@cleat/core';
import { Loading, Shell } from '../../components/Shell';
import { api, type CoachResponse, type CravingPlan } from '../../lib/api';
import {
  loadOfflineKit,
  offlineCravingPlan,
  offlineEmergency,
  queueCraving,
} from '../../lib/offline';
import { useRequireAuth } from '../../lib/session';

/**
 * Read from the domain package rather than copied.
 *
 * Both clients kept their own hand-typed copy of these lists, which meant
 * three places to change and two to forget. The API validates against the
 * same arrays, so a client that drifted would offer a chip the server refuses.
 */
const FEELINGS = CRAVING_FEELINGS;
const LOCATIONS = CRAVING_LOCATIONS;

type Step = 'safety' | 'feeling' | 'location' | 'intensity' | 'plan' | 'emergency';

/**
 * The way back one question.
 *
 * Tapping a chip both answers and advances, which is right — it is the fastest
 * thing to do with one unsteady hand — but it also means a mis-tap used to be
 * final. Quiet and below the answers, so it is there without competing with
 * them.
 */
function StepBack({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <p className="center">
      <button type="button" className="pill" onClick={onClick}>
        {label}
      </button>
    </p>
  );
}

/**
 * The craving engine.
 *
 * One question per screen, large targets, no typing required to get help. The
 * safety question comes first and its "yes" branch leaves the flow entirely —
 * nothing further down this page is appropriate for someone in danger.
 */
export default function CravingPage() {
  const { user, loading, t, locale } = useRequireAuth();
  const [step, setStep] = useState<Step>('safety');
  const [feeling, setFeeling] = useState<string>('craving');
  const [location, setLocation] = useState<string>('home');
  const [intensity, setIntensity] = useState(7);
  const [plan, setPlan] = useState<(CravingPlan & { offline?: boolean }) | null>(null);
  const [emergency, setEmergency] = useState<CoachResponse | null>(null);
  const [busy, setBusy] = useState(false);
  /** Set once an outcome has been recorded, so the press is acknowledged. */
  const [logged, setLogged] = useState(false);

  /*
   * One question per screen means the question is the screen. When the step
   * changes React swaps the markup out from under whatever had focus, and
   * focus falls back to <body>: a keyboard user lands at the top of the
   * document each time, and a screen reader says nothing at all — the new
   * question is simply never announced. Moving focus to the heading is what
   * makes the flow a flow rather than five pages that happen to share a URL.
   */
  const headingRef = useRef<HTMLHeadingElement>(null);
  const firstStep = useRef(true);
  useEffect(() => {
    // Not on arrival: the page's own <h1> is the right landing point, and
    // stealing focus on first paint moves somebody who has not acted yet.
    if (firstStep.current) {
      firstStep.current = false;
      return;
    }
    headingRef.current?.focus();
  }, [step]);

  if (loading || !user) return <Loading />;

  const QUESTION_STEPS: Step[] = ['safety', 'feeling', 'location', 'intensity'];
  const stepIndex = QUESTION_STEPS.indexOf(step);
  const back = (target: Step) => {
    setLogged(false);
    setStep(target);
  };

  async function declareDanger() {
    setBusy(true);
    try {
      setEmergency(
        await api.post<CoachResponse>('/v1/coach/message', {
          message: t('craving.step.safety'),
          mode: 'acute',
          immediateDanger: true,
        }),
      );
    } catch {
      // The one press in this product that must never depend on a network.
      // Before this, a failed request left the person on the safety question
      // with nothing having happened — having just told the app that somebody
      // is in immediate danger. The numbers are bundled; there is nothing to
      // wait for.
      setEmergency(offlineEmergency(locale, user?.country, loadOfflineKit()) as CoachResponse);
    } finally {
      setStep('emergency');
      setBusy(false);
    }
  }

  async function buildPlan() {
    setBusy(true);
    try {
      setPlan(await api.post<CravingPlan>('/v1/craving/plan', { feeling, location, intensity }));
    } catch {
      // No network. This is the case the whole offline kit exists for: the
      // protocol, the tools and the person's own why are on the device, so the
      // screen still does its job instead of apologising.
      setPlan(offlineCravingPlan(locale, intensity, loadOfflineKit()) as never);
    } finally {
      setStep('plan');
      setBusy(false);
    }
  }

  async function logOutcome(outcome: 'resisted' | 'used') {
    // Acknowledged either way. The request may go to the queue instead of the
    // server, but from where the person is standing the thing they pressed
    // happened — and a button that does nothing visible after being pressed at
    // the end of a craving reads as the app having stopped caring.
    setLogged(true);
    try {
      await api.post('/v1/cravings', { intensity, feeling, location, outcome });
    } catch {
      // Queue it rather than lose it. The pattern engine is only as good as the
      // logs, and the hardest cravings are exactly the ones logged offline.
      queueCraving({
        intensity,
        feeling,
        location,
        outcome,
        occurredAt: new Date().toISOString(),
      });
    }
  }

  if (step === 'emergency') {
    return (
      <Shell title={t('safety.emergencyTitle')}>
        <div className="card warning">
          <p className="lede">{emergency?.reply ?? t('safety.emergency')}</p>
        </div>
        <h2>{t('safety.resourcesTitle')}</h2>
        <div className="card">
          {(emergency?.safety.resources ?? []).map((resource) => (
            <div className="resource" key={resource.key}>
              <span>{resource.label}</span>
              {resource.contact ? (
                // The visible text stays the number — it is what somebody
                // reads off the screen to dial by hand. The accessible name
                // adds the verb and who answers, because "zero two zero two
                // two zero zero six zero" on its own says neither.
                <a
                  className="num"
                  href={`tel:${resource.contact.replace(/\s/g, '')}`}
                  aria-label={t('action.callNumber', {
                    name: resource.label,
                    number: resource.contact,
                  })}
                >
                  {resource.contact}
                </a>
              ) : null}
            </div>
          ))}
        </div>
        <p className="muted">{t('safety.notAlone')}</p>
      </Shell>
    );
  }

  return (
    <Shell title={t('craving.title')}>
      {/* Where you are in the flow. Four screens that each show one question
          and no context is the pattern that makes people abandon halfway,
          because nothing on screen says whether the next tap is the last one. */}
      {stepIndex >= 0 ? (
        <p className="muted step-counter">
          {t('craving.step.progress', { step: stepIndex + 1, total: QUESTION_STEPS.length })}
        </p>
      ) : null}

      {step === 'safety' ? (
        <>
          <h2 className="lede step-question" ref={headingRef} tabIndex={-1}>
            {t('craving.step.safety')}
          </h2>
          {/* Full width and stacked, not two small chips side by side.
              This is the screen somebody opens at their worst, possibly with
              unsteady hands, and these two buttons are the only things on it —
              so they should be the largest targets in the product rather than
              the smallest. "Yes" stays first: it is the answer that matters
              most, and it must never be the harder one to hit. */}
          <div className="choice-stack">
            <button
              className="btn danger wide tall"
              onClick={() => void declareDanger()}
              disabled={busy}
            >
              {t('craving.step.safety.yes')}
            </button>
            <button className="btn primary wide tall" onClick={() => setStep('feeling')}>
              {t('craving.step.safety.no')}
            </button>
          </div>
        </>
      ) : null}

      {step === 'feeling' ? (
        <>
          <h2 className="lede step-question" id="q-feeling" ref={headingRef} tabIndex={-1}>
            {t('craving.step.feeling')}
          </h2>
          {/* A named group, so the answers are announced as answers to this
              question rather than as a dozen loose buttons in a row. They are
              buttons and not radios on purpose: a tap does not select, it
              answers and moves on, and nothing here is ever submitted. */}
          <div className="chips" role="group" aria-labelledby="q-feeling">
            {FEELINGS.map((option) => (
              <button
                key={option}
                className="chip"
                type="button"
                onClick={() => {
                  setFeeling(option);
                  setStep('location');
                }}
              >
                {t(`feeling.${option}`)}
              </button>
            ))}
          </div>
          <StepBack label={t('craving.step.back')} onClick={() => back('safety')} />
        </>
      ) : null}

      {step === 'location' ? (
        <>
          <h2 className="lede step-question" id="q-location" ref={headingRef} tabIndex={-1}>
            {t('craving.step.location')}
          </h2>
          <div className="chips" role="group" aria-labelledby="q-location">
            {LOCATIONS.map((option) => (
              <button
                key={option}
                className="chip"
                type="button"
                onClick={() => {
                  setLocation(option);
                  setStep('intensity');
                }}
              >
                {t(`location.${option}`)}
              </button>
            ))}
          </div>
          <StepBack label={t('craving.step.back')} onClick={() => back('feeling')} />
        </>
      ) : null}

      {step === 'intensity' ? (
        <>
          <h2 className="lede step-question" id="q-intensity" ref={headingRef} tabIndex={-1}>
            {t('craving.step.intensity')}
          </h2>
          <div className="card">
            <div className="slider-row">
              {/* The question is the slider's label. Unlabelled, it announced
                  itself as "slider, 7" — seven of what, on a screen whose whole
                  purpose is to ask how bad it is right now. */}
              <input
                id="craving-intensity"
                type="range"
                min={0}
                max={10}
                value={intensity}
                aria-labelledby="q-intensity"
                aria-valuetext={t('scale.valueText', { value: intensity })}
                onChange={(event) => setIntensity(Number(event.target.value))}
              />
              <span className="slider-value" aria-hidden="true">
                {intensity}
              </span>
            </div>
          </div>
          <button
            className="btn primary wide"
            type="button"
            onClick={() => void buildPlan()}
            disabled={busy}
          >
            {t('craving.step.coach')}
          </button>
          <StepBack label={t('craving.step.back')} onClick={() => back('location')} />
        </>
      ) : null}

      {step === 'plan' && plan ? (
        <>
          {plan.leaveFirst ? (
            <div className="card accent">
              <p className="lede">{t('craving.leaveFirst')}</p>
            </div>
          ) : null}

          <div className="card accent">
            <p className="lede">{t('craving.delay', { minutes: plan.delayMinutes })}</p>
          </div>

          {plan.offline ? <p className="muted">{t('offline.planSource')}</p> : null}

          {plan.callFirst ? (
            <div className="card">
              <h3>{t('craving.callFirst', { name: plan.callFirst.name })}</h3>
              {plan.callFirst.phone ? (
                <a
                  className="btn primary wide"
                  href={`tel:${plan.callFirst.phone.replace(/\s/g, '')}`}
                >
                  {t('action.callName', { name: plan.callFirst.name })}
                </a>
              ) : null}
            </div>
          ) : null}

          <h2>{t('toolbox.title')}</h2>
          {/* A list, because it is one. As loose <span>s the count was never
              announced, so there was no way to know whether two things had been
              suggested or nine without reading to the end of them. */}
          <ul className="chips chip-list">
            {plan.tools.map((tool) => (
              <li className="chip" key={tool.id}>
                {tool.label}
              </li>
            ))}
          </ul>

          {plan.whyStatement ? (
            <>
              <h2>{t('why.title')}</h2>
              <div className="card">
                <p className="lede">{plan.whyStatement}</p>
              </div>
            </>
          ) : null}

          <h2>{t('protocol.title')}</h2>
          <ol className="steps">
            {plan.protocol.map((line) => (
              <li key={line}>{line}</li>
            ))}
          </ol>

          <h2>{t('surf.title')}</h2>
          <div className="card">
            {plan.urgeSurfing.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>

          <h2>{t('craving.howDidItGo')}</h2>
          {/* Either answer is an answer. Neither is congratulated and neither is
              scolded — the copy is the same one line for both, because "I used"
              is a log entry, not a verdict. */}
          {logged ? (
            <p className="card accent" role="status">
              {t('craving.logged')}
            </p>
          ) : (
            <div className="btn-row">
              <button
                className="btn primary"
                type="button"
                onClick={() => void logOutcome('resisted')}
              >
                {t('craving.outcome.resisted')}
              </button>
              <button className="btn" type="button" onClick={() => void logOutcome('used')}>
                {t('craving.outcome.used')}
              </button>
            </div>
          )}

          <div className="spacer" />
          <p className="lede">{plan.followUp}</p>
          <Link className="btn wide" href="/coach">
            {t('quick.talk')}
          </Link>
        </>
      ) : null}
    </Shell>
  );
}
