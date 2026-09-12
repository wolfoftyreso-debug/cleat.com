import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import {
  RELAPSE_AUTOPSY_QUESTIONS,
  RELAPSE_CONTINUITY_KEY,
  RELAPSE_OPENING_KEY,
  RELAPSE_SAFETY_QUESTIONS,
} from '@cleat/core';
import { useAction } from '../src/action';
import { api } from '../src/api';
import { useSession } from '../src/session';
import { colors, styles } from '../src/theme';

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
 * "I messed up".
 *
 * Safety before questions, and no lost-progress language anywhere on the screen.
 * The three numbers at the end exist to make one point concrete: the earlier
 * recovery is still there.
 */
export default function RelapseScreen() {
  const { t } = useSession();
  const router = useRouter();
  const [stage, setStage] = useState<'safety' | 'autopsy' | 'done'>('safety');
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<RelapseResult | null>(null);
  /*
   * The most costly place in the app to lose a write: this is somebody's own
   * account of the hardest thing that has happened to them this month, and
   * they do not get a second run at writing it.
   */
  const { busy, error, run } = useAction(t);

  /*
   * Built here, not fetched.
   *
   * These came from GET /v1/relapse/questions, whose failure was swallowed —
   * and the screen returned early on `!questions`, so a request that never came
   * back left somebody who had just relapsed looking at "Loading…" forever.
   * No error, no retry, no way forward: the safety questions and the route to
   * the emergency numbers are both inside the markup that never rendered.
   *
   * The endpoint was a pure function of locale over two constants from
   * @cleat/core and the shared catalogue, all of which ship in this app. The
   * round trip bought nothing and could only fail.
   */
  const questions: Questions = useMemo(
    () => ({
      opening: t(RELAPSE_OPENING_KEY),
      continuity: t(RELAPSE_CONTINUITY_KEY),
      safety: RELAPSE_SAFETY_QUESTIONS.map((key) => ({ key, text: t(key) })),
      autopsy: RELAPSE_AUTOPSY_QUESTIONS.map((q) => ({
        field: q.field,
        key: q.key,
        text: t(q.key),
      })),
    }),
    [t],
  );

  async function submit() {
    setResult(await api.post<RelapseResult>('/v1/relapse', { autopsy: answers }));
    setStage('done');
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText} accessibilityRole="alert">
            {error}
          </Text>
        </View>
      ) : null}
      <View style={[styles.card, styles.cardAccent]}>
        <Text style={styles.lede}>{questions.opening}</Text>
        <Text style={styles.body}>{questions.continuity}</Text>
      </View>

      {stage === 'safety' ? (
        <>
          <Text style={styles.h2} accessibilityRole="header">{t('relapse.safety.are_you_safe').toUpperCase()}</Text>
          <View style={styles.card}>
            {questions.safety.map((question) => (
              <Text style={styles.body} key={question.key}>
                {question.text}
              </Text>
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, styles.actionDanger]}
            onPress={() => router.push('/craving')}
          >
            <Text style={[styles.buttonText, styles.actionTextDanger]}>
              {t('safety.emergencyTitle')}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => setStage('autopsy')}
          >
            <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
              {t('action.continue')}
            </Text>
          </TouchableOpacity>
        </>
      ) : null}

      {stage === 'autopsy' ? (
        <>
          <Text style={styles.h2} accessibilityRole="header">{t('relapse.autopsyTitle').toUpperCase()}</Text>
          <Text style={styles.body}>{t('relapse.autopsyIntro')}</Text>
          {questions.autopsy.map((question) => (
            <View key={question.field} style={{ marginBottom: 10 }}>
              <Text style={styles.label}>{question.text}</Text>
              <TextInput
                style={styles.input}
                value={answers[question.field] ?? ''}
                onChangeText={(value) =>
                  setAnswers((current) => ({ ...current, [question.field]: value }))
                }
                placeholderTextColor={colors.textFaint}
              />
            </View>
          ))}
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={run(submit)}
            disabled={busy}
          >
            <Text style={[styles.buttonText, styles.buttonTextPrimary]}>{t('action.save')}</Text>
          </TouchableOpacity>
        </>
      ) : null}

      {stage === 'done' && result ? (
        <>
          <View style={[styles.card, styles.cardAccent]}>
            <Text style={styles.lede}>{result.message}</Text>
          </View>

          <View style={styles.statGrid}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{result.streak.currentDays}</Text>
              <Text style={styles.statLabel}>{t('streak.current').toUpperCase()}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{result.streak.longestDays}</Text>
              <Text style={styles.statLabel}>{t('streak.longest').toUpperCase()}</Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>{result.streak.totalDaysInRecovery}</Text>
              <Text style={styles.statLabel}>{t('streak.total').toUpperCase()}</Text>
            </View>
          </View>

          <Text style={styles.h2} accessibilityRole="header">{t('relapse.planTitle').toUpperCase()}</Text>
          {result.protectionPlan.warningSigns.length ? (
            <View style={styles.card}>
              <Text style={styles.h3} accessibilityRole="header">{t('relapse.planWarnings')}</Text>
              {result.protectionPlan.warningSigns.map((sign) => (
                <Text style={styles.body} key={sign}>
                  {sign}
                </Text>
              ))}
            </View>
          ) : null}

          {result.protectionPlan.countermeasures.length ? (
            <View style={styles.card}>
              <Text style={styles.h3} accessibilityRole="header">{t('relapse.planCountermeasures')}</Text>
              {result.protectionPlan.countermeasures.map((item) => (
                <Text style={styles.body} key={item}>
                  {item}
                </Text>
              ))}
            </View>
          ) : null}

          <Text style={styles.lede}>{t('relapse.nextHour')}</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => router.push('/coach')}
          >
            <Text style={[styles.buttonText, styles.buttonTextPrimary]}>{t('quick.talk')}</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </ScrollView>
  );
}
