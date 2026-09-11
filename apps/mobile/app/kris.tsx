import { emergencyResources } from '@cleat/core';
import { translator, type Locale } from '@cleat/i18n';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSession } from '../src/session';
import { colors, styles } from '../src/theme';

/**
 * Numbers to call now.
 *
 * The one screen in the mobile client that asks nothing of the person: no
 * account, no request to the API, no logging. Everything on it comes from the
 * shared tables in `@cleat/core` and the shared catalogue, so it renders with
 * the app offline and it cannot drift away from what the coach hands out in an
 * emergency.
 *
 * It is reachable while signed out, which is the whole point — the moment
 * somebody needs this, being asked to log in first is a wall.
 */
export default function CrisisScreen() {
  const { user } = useSession();
  // Signed out there is no profile to read, and Sweden is this deployment's
  // default. A wrong number is worse than a generic one, so anything the app
  // does not actually know falls back to the generic list inside `core`.
  const locale: Locale = user?.locale ?? 'sv';
  const t = translator(locale);
  const resources = emergencyResources(user?.country ?? 'SE', 'emergency');

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h1} accessibilityRole="header">{t('crisis.title')}</Text>
      <Text style={styles.lede}>{t('crisis.lede')}</Text>

      {resources.map((resource) => (
        <View style={styles.card} key={resource.key}>
          <Text style={styles.h3} accessibilityRole="header">{t(resource.key)}</Text>
          {/* One tap, not a number to memorise and retype with unsteady
              hands. Resources with no number — "your local service" — say so
              instead of offering a dead button. */}
          {resource.contact ? (
            <TouchableOpacity
              accessibilityRole="button"
              // The number stays the visible text — it is what somebody reads
              // off the screen to dial on another phone. The spoken label adds
              // the verb and who answers, because a string of digits read out
              // one at a time says neither.
              accessibilityLabel={t('action.callNumber', {
                name: t(resource.key),
                number: resource.contact,
              })}
              onPress={() => {
                void Linking.openURL(`tel:${resource.contact.replace(/\s/g, '')}`).catch(
                  () => undefined,
                );
              }}
            >
              <Text
                style={{
                  color: colors.accent,
                  fontSize: 30,
                  fontWeight: '800',
                  letterSpacing: -0.5,
                }}
              >
                {resource.contact}
              </Text>
            </TouchableOpacity>
          ) : null}
          <Text style={styles.body}>{t(`${resource.key}.when`)}</Text>
        </View>
      ))}

      <Text style={styles.h2} accessibilityRole="header">{t('crisis.noWordsTitle').toUpperCase()}</Text>
      <View style={styles.card}>
        <Text style={styles.body}>{t('crisis.noWordsBody')}</Text>
        <Text style={styles.body}>{t('crisis.someoneElse')}</Text>
      </View>

      {/* Abrupt withdrawal from alcohol or benzodiazepines can kill. This block
          is on the crisis screen deliberately: it is the one place where the
          thing the person came here determined to do is the dangerous one. */}
      <Text style={styles.h2} accessibilityRole="header">{t('crisis.detoxTitle').toUpperCase()}</Text>
      <View style={[styles.card, styles.cardWarning]}>
        <Text style={styles.body}>{t('crisis.detoxBody')}</Text>
      </View>

      <Text style={[styles.muted, { marginTop: 20 }]}>{t('crisis.privacyNote')}</Text>
      <Text style={styles.muted}>{t('safety.disclaimer')}</Text>
    </ScrollView>
  );
}
