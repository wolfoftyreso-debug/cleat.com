import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { api, type CoachResponse, type Dashboard } from '../src/api';
import { useSession } from '../src/session';
import { styles } from '../src/theme';

/**
 * Cleat Now — "I'm struggling".
 *
 * The mode for the hour *before* the craving, which is the hour that actually
 * decides things. By the time Reset is open the decision is already close; this
 * screen exists to catch the drift earlier, when there is still room to change
 * something cheaply.
 *
 * Deliberately not the craving flow: no safety gate, no intensity slider, no
 * countdown. Those would tell somebody who is merely wobbling that they are in
 * crisis, which is its own kind of suggestion.
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

export default function StrugglingScreen() {
  const { user, t } = useSession();
  const router = useRouter();
  const [state, setState] = useState<string | null>(null);
  const [reply, setReply] = useState<CoachResponse | null>(null);
  const [data, setData] = useState<Dashboard | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!user) return;
    void api
      .get<Dashboard>('/v1/dashboard')
      .then(setData)
      .catch(() => undefined);
  }, [user]);

  async function pick(option: string) {
    setState(option);
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
      setReply(null);
    } finally {
      setBusy(false);
    }
  }

  const primaryContact =
    data?.supportContacts.find((contact) => contact.isPrimary) ?? data?.supportContacts[0] ?? null;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h1} accessibilityRole="header">{t('mode.now')}</Text>
      <Text style={styles.lede}>{t('now.intro')}</Text>

      {!state ? (
        <>
          <Text style={styles.h2} accessibilityRole="header">{t('now.whatIsHappening').toUpperCase()}</Text>
          <View style={styles.row}>
            {STATES.map((option) => (
              <TouchableOpacity key={option} style={styles.chip} onPress={() => void pick(option)}>
                <Text style={styles.chipText}>{t(`feeling.${option}`)}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      ) : null}

      {busy ? <Text style={styles.muted}>{t('coach.thinking')}</Text> : null}

      {reply ? (
        <View style={[styles.card, styles.cardAccent]}>
          <Text style={styles.lede}>{reply.reply}</Text>
        </View>
      ) : null}

      {state && !busy ? (
        <>
          {/* The three cheapest things that work, always in the same order, so
              they become muscle memory rather than a menu to evaluate. */}
          <Text style={styles.h2} accessibilityRole="header">{t('now.cheapest').toUpperCase()}</Text>
          {primaryContact?.phone ? (
            <TouchableOpacity
              style={[styles.button, styles.buttonPrimary]}
              accessibilityRole="button"
              onPress={() => {
                void Linking.openURL(
                  `tel:${primaryContact.phone?.replace(/\s/g, '') ?? ''}`,
                ).catch(() => undefined);
              }}
            >
              <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
                {t('action.callName', { name: primaryContact.name })}
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.button} onPress={() => router.push('/plan')}>
              <Text style={styles.buttonText}>{t('support.add')}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity style={styles.button} onPress={() => router.push('/coach')}>
            <Text style={styles.buttonText}>{t('quick.talk')}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/toolbox')}>
            <Text style={styles.buttonText}>{t('toolbox.title')}</Text>
          </TouchableOpacity>

          {data?.profile.whyStatement ? (
            <>
              <Text style={styles.h2} accessibilityRole="header">{t('why.title').toUpperCase()}</Text>
              <View style={styles.card}>
                <Text style={styles.lede}>{data.profile.whyStatement}</Text>
              </View>
            </>
          ) : null}

          {/* What has actually worked for this person before — their own
              evidence, not generic advice. */}
          {data?.insights.length ? (
            <>
              <Text style={styles.h2} accessibilityRole="header">{t('insight.title').toUpperCase()}</Text>
              {data.insights.slice(0, 2).map((insight) => (
                <View style={styles.card} key={insight.id}>
                  <Text style={styles.body}>{insight.text}</Text>
                </View>
              ))}
            </>
          ) : null}

          <Text style={[styles.muted, { marginTop: 16 }]}>{t('now.ifItGetsWorse')}</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => router.push('/craving')}
          >
            <Text style={[styles.buttonText, styles.buttonTextPrimary]}>{t('mode.reset')}</Text>
          </TouchableOpacity>
        </>
      ) : null}
    </ScrollView>
  );
}
