'use client';

import { useEffect, useState } from 'react';
import {
  costBasisFor,
  substanceProfile,
  unitKeyFor,
  type IntakeForm,
  type SubstanceKind,
} from '@cleat/core';
import { Loading, Shell } from '../../components/Shell';
import { api, type Dashboard } from '../../lib/api';
import { useRequireAuth } from '../../lib/session';
import { useAction } from '../../lib/action';

const SUBSTANCES = [
  'alcohol',
  'nicotine',
  'cannabis',
  'opioids',
  'stimulants',
  'benzodiazepines',
  'sedatives',
  'polysubstance',
  'gambling',
  'other_behaviour',
] as const;

export default function PlanPage() {
  const { user, loading, t } = useRequireAuth();
  const [data, setData] = useState<Dashboard | null>(null);
  const [why, setWhy] = useState('');
  const [future, setFuture] = useState<Record<string, string>>({});
  const [contactName, setContactName] = useState('');
  const [contactRelation, setContactRelation] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [substance, setSubstance] = useState<SubstanceKind>('alcohol');
  const [unitsPerDay, setUnitsPerDay] = useState(6);
  /**
   * The price of the thing the person actually buys, not of one unit.
   *
   * For most substances those are the same and this is a per-unit price. For
   * cigarettes it is the pack, because nobody knows what one costs — asking
   * for the per-unit figure gets a wrong number or an abandoned form, and the
   * money this gives back is one of the few things that keeps somebody opening
   * the app in week three.
   */
  const [purchaseCost, setPurchaseCost] = useState(30);
  const [purchaseSize, setPurchaseSize] = useState(1);
  /** Nicotine only. Unanswered is allowed and means "the safe subset". */
  const [intakeForm, setIntakeForm] = useState<IntakeForm | null>(null);
  const [detoxMessage, setDetoxMessage] = useState<string | null>(null);
  const { busy, error, run } = useAction(t);

  async function reload() {
    const dashboard = await api.get<Dashboard>('/v1/dashboard');
    setData(dashboard);
    setWhy(dashboard.profile.whyStatement ?? '');
    setFuture(dashboard.profile.futureSelf ?? {});
  }

  useEffect(() => {
    if (!user) return;
    void reload().catch(() => undefined);
  }, [user]);

  const basis = costBasisFor(substance, intakeForm);
  const byThePack = basis.unitsPerPurchase > 1;
  const unitLabel = t(unitKeyFor(substance, intakeForm));
  const purchaseLabel = t(basis.purchaseKey);

  if (loading || !user) return <Loading />;

  async function saveProfile() {
    await api.put('/v1/me/profile', { whyStatement: why, futureSelf: future });
    await reload();
  }

  async function createPlan() {
    const response = await api.post<{
      detoxWarning: { required: boolean; message?: string };
    }>('/v1/quit', {
      substance,
      baselineUnitsPerDay: unitsPerDay,
      // The API stores money in minor units so nothing ever rounds oddly, and
      // the division happens here in minor units for the same reason.
      unitCostMinor: Math.round((purchaseCost * 100) / Math.max(1, purchaseSize)),
      currency: 'SEK',
      ...(substance === 'nicotine' && intakeForm ? { intakeForm } : {}),
    });
    setDetoxMessage(response.detoxWarning.required ? response.detoxWarning.message ?? null : null);
    await reload();
  }

  async function addContact() {
    if (!contactName.trim()) return;
    await api.post('/v1/support', {
      name: contactName,
      relation: contactRelation,
      phone: contactPhone || null,
      isPrimary: (data?.supportContacts.length ?? 0) === 0,
    });
    // Only cleared once the write has actually landed. Clearing first loses
    // what they typed if the request then fails.
    setContactName('');
    setContactRelation('');
    setContactPhone('');
    await reload();
  }

  return (
    <Shell title={t('nav.plan')}>
      {error ? <div className="error-banner" role="alert">{error}</div> : null}
      {!data?.quit ? (
        <>
          <h2>{t('onboarding.pickSubstance')}</h2>
          <div className="chips">
            {SUBSTANCES.map((option) => (
              <button
                key={option}
                className="chip"
                data-selected={substance === option}
                onClick={() => {
                  setSubstance(option);
                  setPurchaseSize(substanceProfile(option).costBasis.unitsPerPurchase);
                }}
              >
                {t(`substance.${option}`)}
              </button>
            ))}
          </div>

          <div className="card" style={{ marginTop: 14 }}>
            <div className="field">
              <label htmlFor="units">{t('onboarding.unitsPerDay', { unit: unitLabel })}</label>
              <input
                id="units"
                type="number"
                min={0}
                value={unitsPerDay}
                onChange={(event) => setUnitsPerDay(Number(event.target.value))}
              />
            </div>
            <div className="field">
              <label htmlFor="cost">
                {byThePack
                  ? t('onboarding.purchaseCost', { purchase: purchaseLabel })
                  : t('onboarding.cost', { unit: unitLabel })}
              </label>
              <input
                id="cost"
                type="number"
                min={0}
                value={purchaseCost}
                onChange={(event) => setPurchaseCost(Number(event.target.value))}
              />
            </div>
            {byThePack ? (
              <div className="field">
                <label htmlFor="size">
                  {t('onboarding.purchaseSize', { purchase: purchaseLabel })}
                </label>
                <input
                  id="size"
                  type="number"
                  min={1}
                  value={purchaseSize}
                  onChange={(event) => setPurchaseSize(Math.max(1, Number(event.target.value)))}
                />
              </div>
            ) : null}
            {/* Asked rather than assumed, and skippable. Somebody quitting
                snus in Sweden may never have lit anything, and telling them
                their lung function has improved is a false claim about their
                body — not encouragement that misses. */}
            {substance === 'nicotine' ? (
              <div className="field">
                <label>{t('onboarding.intakeForm')}</label>
                <div className="chips">
                  {(['smoked', 'oral', 'both'] as const).map((option) => (
                    <button
                      key={option}
                      type="button"
                      className="chip"
                      data-selected={intakeForm === option}
                      onClick={() => {
                        const next = intakeForm === option ? null : option;
                        setIntakeForm(next);
                        // A can of snus is not a pack of cigarettes. The
                        // number moves with the answer so nobody has to.
                        setPurchaseSize(costBasisFor(substance, next).unitsPerPurchase);
                      }}
                    >
                      {t(`intake.${option}`)}
                    </button>
                  ))}
                </div>
                <p className="muted" style={{ marginTop: 8 }}>
                  {t('onboarding.intakeForm.hint')}
                </p>
              </div>
            ) : null}

            <button className="btn primary wide" onClick={run(createPlan)} disabled={busy}>
              {t('onboarding.done')}
            </button>
          </div>

          {detoxMessage ? (
            <div className="card warning">
              <p className="lede">{detoxMessage}</p>
            </div>
          ) : null}
        </>
      ) : null}

      <h2 id="why">{t('why.title')}</h2>
      <div className="card">
        <p className="muted">{t('why.questions.cost')}</p>
        <p className="muted">{t('why.questions.who')}</p>
        <p className="muted">{t('why.questions.year')}</p>
        <div className="field" style={{ marginTop: 12 }}>
          {/* Named by the section heading it belongs to. The three prompting
              questions above it are context, not a label, and the placeholder
              vanishes the moment somebody answers them. */}
          <textarea
            id="why-statement"
            aria-labelledby="why"
            value={why}
            onChange={(event) => setWhy(event.target.value)}
            placeholder={t('why.prompt')}
          />
        </div>
        <button className="btn primary wide" onClick={run(saveProfile)} disabled={busy}>
          {t('action.save')}
        </button>
      </div>

      <h2>{t('future.title')}</h2>
      <div className="card">
        {(
          [
            ['days30', 'future.30'],
            ['days90', 'future.90'],
            ['year1', 'future.1y'],
            ['year5', 'future.5y'],
          ] as const
        ).map(([field, label]) => (
          <div className="field" key={field}>
            <label htmlFor={field}>{t(label)}</label>
            <input
              id={field}
              value={future[field] ?? ''}
              onChange={(event) =>
                setFuture((current) => ({ ...current, [field]: event.target.value }))
              }
            />
          </div>
        ))}
        <button className="btn primary wide" onClick={run(saveProfile)} disabled={busy}>
          {t('action.save')}
        </button>
      </div>

      <h2 id="support">{t('support.title')}</h2>
      {data?.supportContacts.length ? (
        <div className="card">
          {data.supportContacts.map((contact) => (
            <div className="resource" key={contact.id}>
              <span>
                {contact.name}
                {contact.relation ? ` · ${contact.relation}` : ''}
                {contact.isPrimary ? (
                  <span className="pill" data-tone="accent" style={{ marginLeft: 8 }}>
                    1
                  </span>
                ) : null}
              </span>
              {contact.phone ? (
                // Every contact's link said only "Ring". In a list of five
                // people that is five links with the same name and no way to
                // tell, without sight, which one calls whom.
                <a
                  className="num"
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  aria-label={t('action.callName', { name: contact.name })}
                >
                  {t('action.call')}
                </a>
              ) : null}
            </div>
          ))}
        </div>
      ) : (
        <p className="muted">{t('support.empty')}</p>
      )}

      <div className="card">
        <div className="field">
          <label htmlFor="cname">{t('support.name')}</label>
          <input
            id="cname"
            value={contactName}
            onChange={(event) => setContactName(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="crel">{t('support.relation')}</label>
          <input
            id="crel"
            value={contactRelation}
            onChange={(event) => setContactRelation(event.target.value)}
          />
        </div>
        <div className="field">
          <label htmlFor="cphone">{t('support.phone')}</label>
          <input
            id="cphone"
            type="tel"
            value={contactPhone}
            onChange={(event) => setContactPhone(event.target.value)}
          />
        </div>
        <button className="btn wide" onClick={run(addContact)} disabled={busy}>
          {t('support.add')}
        </button>
      </div>

      <p className="muted">{t('support.noRequirement')}</p>
      <div className="spacer" />
      <p className="muted">{t('about.objective')}</p>
    </Shell>
  );
}
