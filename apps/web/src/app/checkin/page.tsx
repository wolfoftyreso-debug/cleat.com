'use client';

import { useState } from 'react';
import { Loading, Shell } from '../../components/Shell';
import { useAction } from '../../lib/action';
import { api } from '../../lib/api';
import { useRequireAuth } from '../../lib/session';

/**
 * A 0-10 scale.
 *
 * The label used to be a bare <label> with nothing tying it to the input, which
 * is a label in appearance only: the slider announced itself as "slider, 5" with
 * no indication of what was being rated, four times on one screen. It is now a
 * real label, and the value is spoken as "5 of 10" rather than as a naked
 * number that could mean anything.
 */
function Scale({
  id,
  label,
  value,
  onChange,
  valueText,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (next: number) => void;
  valueText: (value: number) => string;
}) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <div className="slider-row">
        <input
          id={id}
          type="range"
          min={0}
          max={10}
          value={value}
          aria-valuetext={valueText(value)}
          onChange={(event) => onChange(Number(event.target.value))}
        />
        <span className="slider-value" aria-hidden="true">
          {value}
        </span>
      </div>
    </div>
  );
}

export default function CheckInPage() {
  const { user, loading, t } = useRequireAuth();
  const hour = new Date().getHours();
  const [kind, setKind] = useState<'morning' | 'evening'>(hour < 15 ? 'morning' : 'evening');

  const [mood, setMood] = useState(5);
  const [sleepQuality, setSleepQuality] = useState(5);
  const [stress, setStress] = useState(5);
  const [cravingIntensity, setCravingIntensity] = useState(3);
  const [biggestRisk, setBiggestRisk] = useState('');
  const [keyDecision, setKeyDecision] = useState('');
  const [wentWell, setWentWell] = useState('');
  const [wasHard, setWasHard] = useState('');
  const [learned, setLearned] = useState('');
  const [saved, setSaved] = useState(false);
  /*
   * This screen was the one that never adopted the shared action helper, and it
   * was written in exactly the shape that helper exists to replace: try/finally
   * with no catch. A failed check-in rejected with nobody listening, the button
   * stopped spinning, and the screen went back to looking precisely as it had
   * before — with everything the person had just written about their night
   * still on it and no indication that none of it had been saved.
   */
  const { busy, error, run } = useAction(t);

  if (loading || !user) return <Loading />;

  const scaleText = (value: number) => t('scale.valueText', { value });

  async function save() {
    setSaved(false);
    // The client sends its own local day: the server's UTC "today" would push
    // an evening check-in into tomorrow for anyone east of Greenwich.
    const now = new Date();
    const day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
      now.getDate(),
    ).padStart(2, '0')}`;

    await api.post('/v1/checkins', {
      kind,
      day,
      mood,
      sleepQuality,
      stress,
      cravingIntensity,
      biggestRisk: kind === 'morning' ? biggestRisk : null,
      keyDecision: kind === 'morning' ? keyDecision : null,
      wentWell: kind === 'evening' ? wentWell : null,
      wasHard: kind === 'evening' ? wasHard : null,
      learned: kind === 'evening' ? learned : null,
    });
    setSaved(true);
  }

  return (
    <Shell title={t(kind === 'morning' ? 'checkin.morning.title' : 'checkin.evening.title')}>
      {error ? (
        <div className="error-banner" role="alert">
          {error}
        </div>
      ) : null}
      <div className="chips" style={{ marginBottom: 20 }}>
        <button
          className="chip"
          data-selected={kind === 'morning'}
          onClick={() => setKind('morning')}
        >
          {t('checkin.morning.title')}
        </button>
        <button
          className="chip"
          data-selected={kind === 'evening'}
          onClick={() => setKind('evening')}
        >
          {t('checkin.evening.title')}
        </button>
      </div>

      <div className="card">
        <Scale
          id="scale-mood"
          label={t('checkin.mood')}
          value={mood}
          onChange={setMood}
          valueText={scaleText}
        />
        <Scale
          id="scale-sleep"
          label={t('checkin.sleep')}
          value={sleepQuality}
          onChange={setSleepQuality}
          valueText={scaleText}
        />
        <Scale
          id="scale-stress"
          label={t('checkin.stress')}
          value={stress}
          onChange={setStress}
          valueText={scaleText}
        />
        <Scale
          id="scale-craving"
          label={t('checkin.craving')}
          value={cravingIntensity}
          onChange={setCravingIntensity}
          valueText={scaleText}
        />
      </div>

      {kind === 'morning' ? (
        <div className="card">
          <div className="field">
            <label htmlFor="risk">{t('checkin.biggestRisk')}</label>
            <input
              id="risk"
              value={biggestRisk}
              onChange={(event) => setBiggestRisk(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="decision">{t('checkin.keyDecision')}</label>
            <input
              id="decision"
              value={keyDecision}
              onChange={(event) => setKeyDecision(event.target.value)}
            />
          </div>
        </div>
      ) : (
        <div className="card">
          <div className="field">
            <label htmlFor="wentWell">{t('checkin.wentWell')}</label>
            <input
              id="wentWell"
              value={wentWell}
              onChange={(event) => setWentWell(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="wasHard">{t('checkin.wasHard')}</label>
            <input
              id="wasHard"
              value={wasHard}
              onChange={(event) => setWasHard(event.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="learned">{t('checkin.learned')}</label>
            <input
              id="learned"
              value={learned}
              onChange={(event) => setLearned(event.target.value)}
            />
          </div>
        </div>
      )}

      <button className="btn primary wide" onClick={run(save)} disabled={busy}>
        {saved ? t('checkin.saved') : t('action.save')}
      </button>
    </Shell>
  );
}
