import { useRouter } from 'expo-router';
import { useCallback, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { api, type Dashboard } from '../src/api';
import { formatMoney, useSession } from '../src/session';
import { styles } from '../src/theme';

export default function HomeScreen() {
  const { user, loading, t, locale } = useSession();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [data, setData] = useState<Dashboard | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  const load = useCallback(async () => {
    try {
      setData(await api.get<Dashboard>('/v1/dashboard'));
    } catch {
      // The home screen degrades to the quick actions rather than an error page:
      // the buttons that matter do not need the network to be reachable.
    }
  }, []);

  useEffect(() => {
    if (!loading && !user) router.replace('/');
  }, [loading, user, router]);

  useEffect(() => {
    if (user) void load();
  }, [user, load]);

  return (
    <ScrollView
      style={styles.screen}
      contentContainerStyle={[styles.content, { paddingTop: insets.top + 20 }]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            // `finally`, so the spinner also stops when the reload fails. On a
            // bad connection the alternative is a wheel that turns forever.
            void load().finally(() => setRefreshing(false));
          }}
          tintColor="#6d7880"
        />
      }
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={styles.wordmark}>{t('app.name').toUpperCase()}</Text>
        {/* Settings is where the second factor, the export and the delete
            button live. Unreachable from the phone, they may as well not
            exist for somebody who never opens the browser. */}
        <TouchableOpacity onPress={() => router.push('/settings')}>
          <Text style={styles.wordmark}>{t('settings.title').toUpperCase()}</Text>
        </TouchableOpacity>
      </View>

      {data?.streak ? (
        <View>
          <Text style={styles.h2} accessibilityRole="header">{t('common.day').toUpperCase()}</Text>
          <Text style={styles.dayCount}>{data.streak.currentDays}</Text>
          {data.streak.isPersonalRecord ? (
            <Text style={[styles.muted, { marginTop: 6 }]}>{t('home.personalRecord')}</Text>
          ) : null}
          <Text style={styles.muted}>
            {t('home.totalInRecovery', { days: data.streak.totalDaysInRecovery })}
          </Text>
        </View>
      ) : (
        <View style={[styles.card, styles.cardAccent]}>
          <Text style={styles.h3} accessibilityRole="header">{t('home.noPlanTitle')}</Text>
          <Text style={styles.body}>{t('home.noPlanBody')}</Text>
        </View>
      )}

      {data?.mantra ? <Text style={styles.mantra}>{data.mantra}</Text> : null}

      {/* The medical warning is not tucked into a settings page. For alcohol and
          benzodiazepines it outranks every other thing on this screen. */}
      {data?.detoxWarning?.required ? (
        <View style={[styles.card, styles.cardWarning]}>
          <Text style={[styles.label, { color: '#ff8f92' }]}>
            {t('safety.important').toUpperCase()}
          </Text>
          <Text style={styles.body}>{t(data.detoxWarning.messageKey)}</Text>
        </View>
      ) : null}

      {/* The five modes, acute ones first and largest. Same spine as the web
          client so a person moving between phone and browser is not relearning
          the product. */}
      <Text style={styles.h2} accessibilityRole="header">{t('home.quickActions').toUpperCase()}</Text>

      <TouchableOpacity
        style={[styles.action, styles.actionPrimary]}
        onPress={() => router.push('/craving')}
      >
        <Text style={styles.actionTextPrimary}>{t('mode.reset')}</Text>
        <Text style={styles.actionSubPrimary}>{t('mode.reset.sub')}</Text>
      </TouchableOpacity>

      {/* Cleat Now, not the chat. The phone used to send this button to the
          coach, so the second of the five modes was a different product here
          than in the browser — and the one it replaced is the one that catches
          the drift an hour before the craving. */}
      <TouchableOpacity style={styles.action} onPress={() => router.push('/struggling')}>
        <Text style={styles.actionText}>{t('mode.now')}</Text>
        <Text style={styles.actionSub}>{t('mode.now.sub')}</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity
          style={[styles.action, { flex: 1 }]}
          onPress={() => router.push('/plan')}
        >
          <Text style={styles.actionText}>{t('mode.path')}</Text>
          <Text style={styles.actionSub}>{t('mode.path.sub')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.action, { flex: 1 }]}
          onPress={() => router.push('/rebuild')}
        >
          <Text style={styles.actionText}>{t('mode.rebuild')}</Text>
          <Text style={styles.actionSub}>{t('mode.rebuild.sub')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.action} onPress={() => router.push('/patterns')}>
        <Text style={styles.actionText}>{t('mode.patterns')}</Text>
        <Text style={styles.actionSub}>{t('mode.patterns.sub')}</Text>
      </TouchableOpacity>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={() => router.push('/checkin')}
        >
          <Text style={styles.buttonText}>{t('quick.checkIn')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={() => router.push('/coach')}
        >
          <Text style={styles.buttonText}>{t('quick.talk')}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row', gap: 10 }}>
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={() => router.push('/toolbox')}
        >
          <Text style={styles.buttonText}>{t('toolbox.title')}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { flex: 1 }]}
          onPress={() => router.push('/triggers')}
        >
          <Text style={styles.buttonText}>{t('trigger.title')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[styles.action, styles.actionDanger]}
        onPress={() => router.push('/relapse')}
      >
        <Text style={[styles.actionText, styles.actionTextDanger]}>{t('quick.messedUp')}</Text>
      </TouchableOpacity>

      {data?.reclaimed ? (
        <>
          <Text style={styles.h2} accessibilityRole="header">{t('reclaimed.moneyTitle').toUpperCase()}</Text>
          <View style={styles.statGrid}>
            <View style={styles.stat}>
              <Text style={styles.statValue}>
                {formatMoney(data.reclaimed.soFar.moneyMinor, data.reclaimed.currency, locale)}
              </Text>
              <Text style={styles.statLabel}>
                {t('reclaimed.horizon.soFar').toUpperCase()}
              </Text>
            </View>
            <View style={styles.stat}>
              <Text style={styles.statValue}>
                {Math.round(data.reclaimed.soFar.minutes / 60)} h
              </Text>
              <Text style={styles.statLabel}>{t('reclaimed.timeTitle').toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.muted}>{t('reclaimed.framing')}</Text>
        </>
      ) : null}

      {data?.milestones?.next ? (
        <>
          <Text style={styles.h2} accessibilityRole="header">{t('milestone.nextTitle').toUpperCase()}</Text>
          <View style={styles.card}>
            <Text style={styles.lede}>{data.milestones.next.text}</Text>
            {data.milestones.next.source ? (
              <Text style={styles.muted}>
                {t('milestone.source', { source: data.milestones.next.source })}
              </Text>
            ) : null}
          </View>
        </>
      ) : null}

      {data?.insights?.length ? (
        <>
          <Text style={styles.h2} accessibilityRole="header">{t('insight.title').toUpperCase()}</Text>
          {data.insights.slice(0, 2).map((insight) => (
            <View style={styles.card} key={insight.id}>
              <Text style={styles.lede}>{insight.text}</Text>
              <Text style={styles.muted}>
                {t('indicator.samples', { count: insight.evidence })}
              </Text>
            </View>
          ))}
        </>
      ) : null}

      <Text style={[styles.muted, { marginTop: 24 }]}>{t('about.objective')}</Text>
    </ScrollView>
  );
}
