import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { describeFailure } from '../src/action';
import { api, type Dashboard } from '../src/api';
import { useSession } from '../src/session';
import { colors, styles } from '../src/theme';

/**
 * My patterns — the seven indicators and what the person's own data says.
 *
 * Deliberately no total score, matching the web client and the product rule: a
 * single percentage turns a life into a scoreboard.
 */
export default function PatternsScreen() {
  const { t } = useSession();
  const [data, setData] = useState<Dashboard | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    // Swallowed, this rendered as though there were no patterns yet — which is
    // a real state this screen has, and not this one.
    void api
      .get<Dashboard>('/v1/dashboard')
      .then(setData)
      .catch((caught: unknown) => setLoadError(describeFailure(t, caught)));
  }, [t]);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {loadError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText} accessibilityRole="alert">
            {loadError}
          </Text>
        </View>
      ) : null}
      <Text style={styles.h1} accessibilityRole="header">{t('indicator.title')}</Text>
      <Text style={styles.body}>{t('indicator.explainer')}</Text>

      <View style={styles.card}>
        {(data?.indicators ?? []).map((indicator) => {
          const value = indicator.value ?? 0;
          const tone = indicator.key === 'risk' ? colors.danger : value >= 70 ? colors.teal : colors.accent;
          return (
            <View key={indicator.key} style={{ marginBottom: 14 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={styles.body}>{indicator.label}</Text>
                <Text style={styles.muted}>{indicator.value == null ? '–' : indicator.value}</Text>
              </View>
              <View
                style={{
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: colors.surfaceRaised,
                  overflow: 'hidden',
                  marginTop: 5,
                }}
              >
                <View
                  style={{ height: '100%', width: `${value}%`, backgroundColor: tone }}
                />
              </View>
            </View>
          );
        })}
      </View>

      <Text style={styles.h2} accessibilityRole="header">{t('insight.title').toUpperCase()}</Text>
      <Text style={styles.body}>{t('insight.subtitle')}</Text>
      {data?.insights.length ? (
        data.insights.map((insight) => (
          <View style={styles.card} key={insight.id}>
            <Text style={styles.lede}>{insight.text}</Text>
            <Text style={styles.muted}>
              {t('indicator.samples', { count: insight.evidence })}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.muted}>{t('common.notEnoughData')}</Text>
      )}

      {data?.streak ? (
        <View style={styles.statGrid}>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{data.streak.currentDays}</Text>
            <Text style={styles.statLabel}>{t('common.day').toUpperCase()}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{data.streak.longestDays}</Text>
            <Text style={styles.statLabel}>{t('home.personalRecord').toUpperCase()}</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statValue}>{data.streak.totalDaysInRecovery}</Text>
            <Text style={styles.statLabel}>{t('common.days').toUpperCase()}</Text>
          </View>
        </View>
      ) : null}
    </ScrollView>
  );
}
