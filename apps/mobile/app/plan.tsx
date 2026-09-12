import { useCallback, useEffect, useState } from 'react';
import { Linking, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  costBasisFor,
  substanceProfile,
  unitKeyFor,
  type IntakeForm,
  type SubstanceKind,
} from '@cleat/core';
import { describeFailure, useAction } from '../src/action';
import { api, type Dashboard } from '../src/api';
import { useSession } from '../src/session';
import { colors, styles } from '../src/theme';

/**
 * The order matters: what most people are here for first, and the two that
 * carry a medical-detox warning last, so nobody taps one by accident while
 * scrolling.
 */
const SUBSTANCES: SubstanceKind[] = [
  'alcohol',
  'nicotine',
  'cannabis',
  'gambling',
  'stimulants',
  'opioids',
  'benzodiazepines',
  'sedatives',
  'polysubstance',
  'other_behaviour',
];

/**
 * My recovery — the person's own plan.
 *
 * Their why statement first, because that is the thing the craving flow reaches
 * for, and it is worth nothing if it was never written.
 */
export default function PlanScreen() {
  const { t } = useSession();
  const [data, setData] = useState<Dashboard | null>(null);
  const [why, setWhy] = useState('');
  const { busy, error, run } = useAction(t);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [substance, setSubstance] = useState<SubstanceKind>('alcohol');
  const [unitsPerDay, setUnitsPerDay] = useState('6');
  /** The price of what people actually buy — a pack, not a cigarette. */
  const [purchaseCost, setPurchaseCost] = useState('30');
  const [purchaseSize, setPurchaseSize] = useState('1');
  const [detoxMessage, setDetoxMessage] = useState<string | null>(null);
  /** Nicotine only. Unanswered is allowed and means "the safe subset". */
  const [intakeForm, setIntakeForm] = useState<IntakeForm | null>(null);

  const load = useCallback(async () => {
    try {
      const dashboard = await api.get<Dashboard>('/v1/dashboard');
      setData(dashboard);
      setWhy(dashboard.profile.whyStatement ?? '');
      setLoadError(null);
    } catch (caught) {
      // A failed load showed the create-a-plan form with its defaults, so
      // somebody who already had a plan was shown the screen for not having
      // one — and the obvious next move was to make a second.
      setData(null);
      setLoadError(describeFailure(t, caught));
    }
  }, [t]);

  useEffect(() => {
    void load();
  }, [load]);

  async function createPlan() {
    const size = Math.max(1, Number(purchaseSize) || 1);
    const response = await api.post<{
      detoxWarning: { required: boolean; message?: string };
    }>('/v1/quit', {
      substance,
      baselineUnitsPerDay: Number(unitsPerDay) || 0,
      // Minor units all the way, so nothing rounds oddly.
      unitCostMinor: Math.round((Number(purchaseCost) * 100 || 0) / size),
      currency: 'SEK',
      ...(substance === 'nicotine' && intakeForm ? { intakeForm } : {}),
    });
    setDetoxMessage(
      response.detoxWarning.required ? response.detoxWarning.message ?? null : null,
    );
    await load();
  }

  async function save() {
    await api.put('/v1/me/profile', { whyStatement: why });
    setSaved(true);
    await load();
  }

  const basis = costBasisFor(substance, intakeForm);
  const byThePack = basis.unitsPerPurchase > 1;
  const purchaseLabel = t(basis.purchaseKey);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {loadError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText} accessibilityRole="alert">
            {loadError}
          </Text>
        </View>
      ) : null}
      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText} accessibilityRole="alert">
            {error}
          </Text>
        </View>
      ) : null}
      <Text style={styles.h1} accessibilityRole="header">{t('mode.path')}</Text>

      {data?.phase ? (
        <View style={styles.card}>
          <Text style={styles.h3} accessibilityRole="header">{data.phase.label}</Text>
          <Text style={styles.body}>{data.phase.reason}</Text>
          <View style={styles.row}>
            {data.phase.focus.map((focus) => (
              <View style={styles.chip} key={focus.key}>
                <Text style={styles.chipText}>{focus.label}</Text>
              </View>
            ))}
          </View>
        </View>
      ) : null}

      {/*
        Creating the plan was missing here entirely: mobile could edit a why
        statement and nothing else, so a person who installed the app and never
        opened the website had no streak, no milestones and no reclaimed time —
        the whole product, waiting on a screen that did not exist.
      */}
      {data?.quit ? null : (
        <>
          <Text style={styles.h2} accessibilityRole="header">{t('onboarding.pickSubstance').toUpperCase()}</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              {SUBSTANCES.map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    setSubstance(option);
                    setPurchaseSize(String(substanceProfile(option).costBasis.unitsPerPurchase));
                  }}
                  style={[styles.chip, option === substance ? styles.chipSelected : null]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: option === substance }}
                >
                  <Text style={styles.chipText}>{t(`substance.${option}`)}</Text>
                </TouchableOpacity>
              ))}
            </View>

            <Text style={[styles.muted, { marginTop: 14 }]}>
              {t('onboarding.unitsPerDay', { unit: t(unitKeyFor(substance, intakeForm)) })}
            </Text>
            <TextInput
              style={styles.input}
              value={unitsPerDay}
              onChangeText={setUnitsPerDay}
              keyboardType="number-pad"
              placeholderTextColor={colors.textFaint}
            />

            <Text style={[styles.muted, { marginTop: 12 }]}>
              {byThePack
                ? t('onboarding.purchaseCost', { purchase: purchaseLabel })
                : t('onboarding.cost', { unit: t(unitKeyFor(substance, intakeForm)) })}
            </Text>
            <TextInput
              style={styles.input}
              value={purchaseCost}
              onChangeText={setPurchaseCost}
              keyboardType="decimal-pad"
              placeholderTextColor={colors.textFaint}
            />

            {byThePack ? (
              <>
                <Text style={[styles.muted, { marginTop: 12 }]}>
                  {t('onboarding.purchaseSize', { purchase: purchaseLabel })}
                </Text>
                <TextInput
                  style={styles.input}
                  value={purchaseSize}
                  onChangeText={setPurchaseSize}
                  keyboardType="number-pad"
                  placeholderTextColor={colors.textFaint}
                />
              </>
            ) : null}

            {/* Asked rather than assumed, and skippable. Somebody quitting
                snus may never have lit anything, and a milestone about lungs
                would be a false claim about their body. */}
            {substance === 'nicotine' ? (
              <>
                <Text style={[styles.muted, { marginTop: 14 }]}>
                  {t('onboarding.intakeForm')}
                </Text>
                <View style={styles.row}>
                  {(['smoked', 'oral', 'both'] as const).map((option) => (
                    <TouchableOpacity
                      key={option}
                      onPress={() => {
                        const next = intakeForm === option ? null : option;
                        setIntakeForm(next);
                        // A can of snus is not a pack of cigarettes.
                        setPurchaseSize(String(costBasisFor(substance, next).unitsPerPurchase));
                      }}
                      style={[styles.chip, intakeForm === option ? styles.chipSelected : null]}
                      accessibilityRole="button"
                      accessibilityState={{ selected: intakeForm === option }}
                    >
                      <Text style={styles.chipText}>{t(`intake.${option}`)}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <Text style={[styles.muted, { marginTop: 6 }]}>
                  {t('onboarding.intakeForm.hint')}
                </Text>
              </>
            ) : null}

            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              onPress={run(createPlan)}
              disabled={busy}
            >
              <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                {t('onboarding.done')}
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}

      {/* Never softened and never dismissed by a tap elsewhere: for alcohol and
          benzodiazepines this is the difference between a hard week and a
          seizure. */}
      {detoxMessage ? (
        <View style={[styles.card, styles.cardWarning]}>
          <Text style={styles.body}>{detoxMessage}</Text>
        </View>
      ) : null}

      <Text style={styles.h2} accessibilityRole="header">{t('why.title').toUpperCase()}</Text>
      <View style={styles.card}>
        <Text style={styles.muted}>{t('why.questions.cost')}</Text>
        <Text style={styles.muted}>{t('why.questions.who')}</Text>
        <TextInput
          style={[styles.input, { minHeight: 110, marginTop: 10 }]}
          value={why}
          onChangeText={setWhy}
          multiline
          placeholder={t('why.prompt')}
          placeholderTextColor={colors.textFaint}
        />
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={run(save)}
          disabled={busy}
        >
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
            {saved ? t('checkin.saved') : t('action.save')}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.h2} accessibilityRole="header">{t('support.title').toUpperCase()}</Text>
      {data?.supportContacts.length ? (
        <View style={styles.card}>
          {data.supportContacts.map((contact) => (
            <TouchableOpacity
              key={contact.id}
              accessibilityRole="button"
              accessibilityLabel={
                contact.phone
                  ? t('action.callNumber', { name: contact.name, number: contact.phone })
                  : contact.name
              }
              onPress={() =>
                contact.phone
                  ? void Linking.openURL(`tel:${contact.phone.replace(/\s/g, '')}`)
                  : undefined
              }
            >
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.h3} accessibilityRole="header">{contact.name}</Text>
                {contact.phone ? <Text style={styles.muted}>{t('action.call')}</Text> : null}
              </View>
            </TouchableOpacity>
          ))}
        </View>
      ) : (
        <Text style={styles.muted}>{t('support.empty')}</Text>
      )}

      <Text style={[styles.muted, { marginTop: 20 }]}>{t('support.noRequirement')}</Text>
    </ScrollView>
  );
}
