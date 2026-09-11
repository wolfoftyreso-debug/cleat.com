import {
  BOUNDARY_SITUATIONS,
  emergencyResources,
  reflectOnSupport,
  supporterResources,
  SUPPORTER_EMERGENCY_SIGNS,
  SUPPORTER_SCALE,
  SUPPORTER_STATEMENTS,
  SUPPORTER_TOPICS,
  type SupporterAnswer,
} from '@cleat/core';
import { translator, type Locale } from '@cleat/i18n';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSession } from '../src/session';
import { colors, styles } from '../src/theme';

/**
 * Cleat Nära on the phone — for the person standing next to an addiction.
 *
 * Reachable signed out, like the crisis screen, and it shows nothing about
 * anybody. A relative who can watch somebody's streak counter has been handed a
 * surveillance tool, and in these households surveillance is usually already
 * part of the problem.
 *
 * The self-check runs in component state and is never sent anywhere. What a
 * person answers here — that they search their partner's pockets, that they are
 * only calm once they know where they are — is more sensitive than anything
 * else in this product, and nothing needs a copy of it.
 */
export default function SupporterScreen() {
  const { user } = useSession();
  const router = useRouter();
  const locale: Locale = user?.locale ?? 'sv';
  const country = user?.country ?? 'SE';
  const t = translator(locale);

  const [answers, setAnswers] = useState<Record<string, SupporterAnswer>>({});
  const reflection = reflectOnSupport(answers);

  const call = (number: string) => {
    void Linking.openURL(`tel:${number.replace(/\s/g, '')}`).catch(() => undefined);
  };

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h1} accessibilityRole="header">{t('near.title')}</Text>
      <Text style={styles.lede}>{t('near.tagline')}</Text>
      <Text style={styles.body}>{t('near.intro')}</Text>

      {/* First, before anything reflective. Somebody opening this at two in the
          morning with a person unconscious in the next room must not scroll
          past a self-assessment to reach it. */}
      <Text style={styles.h2} accessibilityRole="header">{t('near.emergencyTitle').toUpperCase()}</Text>
      <View style={[styles.card, styles.cardWarning]}>
        <Text style={styles.body}>{t('near.emergencyLede')}</Text>
        {SUPPORTER_EMERGENCY_SIGNS.map((sign) => (
          <Text style={styles.body} key={sign}>
            • {t(`near.sign.${sign}`)}
          </Text>
        ))}
        <Text style={styles.body}>{t('near.recoveryPosition')}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
          {emergencyResources(country, 'emergency')
            .filter((resource) => resource.contact)
            .map((resource) => (
              <TouchableOpacity
                key={resource.key}
                accessibilityRole="button"
                accessibilityLabel={t('action.callNumber', {
                  name: t(resource.key),
                  number: resource.contact,
                })}
                onPress={() => call(resource.contact)}
              >
                <Text style={{ color: colors.accent, fontSize: 22, fontWeight: '800' }}>
                  {resource.contact}
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>

      <Text style={styles.h2} accessibilityRole="header">{t('near.understandTitle').toUpperCase()}</Text>
      {SUPPORTER_TOPICS.map((topic) => (
        <View style={styles.card} key={topic}>
          <Text style={styles.h3} accessibilityRole="header">{t(`near.topic.${topic}`)}</Text>
          <Text style={styles.body}>{t(`near.topic.${topic}.body`)}</Text>
        </View>
      ))}

      <Text style={styles.h2} accessibilityRole="header">{t('near.checkTitle').toUpperCase()}</Text>
      <Text style={styles.body}>{t('near.checkLede')}</Text>
      <Text style={styles.muted}>{t('near.checkNotADiagnosis')}</Text>

      {SUPPORTER_STATEMENTS.map((statement) => (
        <View style={styles.card} key={statement.id}>
          <Text style={styles.body}>{t(`near.statement.${statement.id}`)}</Text>
          <View style={styles.row}>
            {SUPPORTER_SCALE.map((value) => {
              const selected = answers[statement.id] === value;
              return (
                <TouchableOpacity
                  key={value}
                  style={[styles.chip, selected ? styles.chipSelected : null]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: selected }}
                  onPress={() =>
                    setAnswers((current) => ({ ...current, [statement.id]: value }))
                  }
                >
                  <Text style={[styles.chipText, selected ? styles.chipTextSelected : null]}>
                    {t(`near.scale.${value}`)}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      ))}

      <Text style={styles.h2} accessibilityRole="header">{t('near.checkResult').toUpperCase()}</Text>
      {reflection.tooLittle ? (
        <Text style={styles.muted}>{t('near.checkTooLittle')}</Text>
      ) : reflection.loudest.length === 0 ? (
        <Text style={styles.muted}>{t('near.checkNothingLoud')}</Text>
      ) : (
        reflection.loudest.map((pattern) => (
          <View style={[styles.card, styles.cardAccent]} key={pattern}>
            <Text style={styles.h3} accessibilityRole="header">{t(`near.pattern.${pattern}`)}</Text>
            <Text style={styles.body}>{t(`near.pattern.${pattern}.body`)}</Text>
            <Text style={styles.lede}>{t(`near.pattern.${pattern}.step`)}</Text>
          </View>
        ))
      )}
      {Object.keys(answers).length > 0 ? (
        <TouchableOpacity style={styles.button} onPress={() => setAnswers({})}>
          <Text style={styles.buttonText}>{t('near.checkReset')}</Text>
        </TouchableOpacity>
      ) : null}

      <Text style={styles.h2} accessibilityRole="header">{t('near.boundariesTitle').toUpperCase()}</Text>
      <Text style={styles.body}>{t('near.boundariesLede')}</Text>
      {BOUNDARY_SITUATIONS.map((situation) => (
        <View style={styles.card} key={situation}>
          <Text style={styles.h3} accessibilityRole="header">{t(`near.boundary.${situation}`)}</Text>
          <Text style={styles.body}>{t(`near.boundary.${situation}.say`)}</Text>
        </View>
      ))}

      <Text style={styles.h2} accessibilityRole="header">{t('near.resourcesTitle').toUpperCase()}</Text>
      <View style={styles.card}>
        {supporterResources(country).map((resource) => (
          <View key={resource.key} style={{ marginBottom: 10 }}>
            <Text style={styles.body}>{t(resource.key)}</Text>
            {resource.contact ? (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel={t('action.callNumber', {
                  name: t(resource.key),
                  number: resource.contact,
                })}
                onPress={() => call(resource.contact)}
              >
                <Text style={{ color: colors.accent, fontSize: 20, fontWeight: '700' }}>
                  {resource.contact}
                </Text>
              </TouchableOpacity>
            ) : null}
          </View>
        ))}
      </View>
      <Text style={styles.muted}>{t('near.noRequirement')}</Text>

      <Text style={styles.h2} accessibilityRole="header">{t('near.talkTitle').toUpperCase()}</Text>
      <View style={styles.card}>
        <Text style={styles.body}>{t('near.talkLede')}</Text>
        <Text style={styles.muted}>{t('near.talkNoAdviceOnLeaving')}</Text>
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => router.push(user ? '/nara-samtal' : '/')}
        >
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
            {user ? t('near.talkTitle') : t('near.talkSignIn')}
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={[styles.muted, { marginTop: 20 }]}>{t('safety.disclaimer')}</Text>
    </ScrollView>
  );
}
