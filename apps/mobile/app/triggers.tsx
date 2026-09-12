import { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { describeFailure } from '../src/action';
import { api } from '../src/api';
import { useSession } from '../src/session';
import { colors, styles } from '../src/theme';

type ChainKey = 'thought' | 'feeling' | 'impulse' | 'action' | 'consequence';

interface Trigger {
  id: string;
  label: string;
  category: string;
  chain: Partial<Record<ChainKey, string>>;
}

interface TriggerView {
  intro: string;
  steps: { key: string; label: string }[];
  triggers: Trigger[];
}

const CHAIN: ChainKey[] = ['thought', 'feeling', 'impulse', 'action', 'consequence'];

/**
 * The trigger map — phase 2 of the recovery model.
 *
 * The point is not collecting triggers. It is making the chain visible: once
 * somebody can see trigger → thought → feeling → impulse → action written down,
 * the impulse stops feeling like one inevitable event and starts looking like
 * five links, any of which can be broken.
 */
export default function TriggersScreen() {
  const { user, t } = useSession();
  const [view, setView] = useState<TriggerView | null>(null);
  const [label, setLabel] = useState('');
  const [chain, setChain] = useState<Partial<Record<ChainKey, string>>>({});
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [loadError, setLoadError] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setView(await api.get<TriggerView>('/v1/triggers'));
      setLoadError(null);
    } catch (caught) {
      // `setView(null)` alone rendered the screen as though the person had
      // mapped no triggers at all.
      setView(null);
      setLoadError(describeFailure(t, caught));
    }
  }, [t]);

  useEffect(() => {
    if (user) void load();
  }, [user, load]);

  async function add() {
    if (!label.trim()) return;
    setBusy(true);
    setError(null);
    try {
      await api.post('/v1/triggers', { label: label.trim(), chain });
      // Cleared only once the write has landed, so a failed request does not
      // take the text with it. Somebody describing the shape of their own
      // relapse does not get a second run at that paragraph.
      setLabel('');
      setChain({});
      await load();
    } catch (caught) {
      // The shared helper draws the distinctions this did not: rate-limited,
      // unavailable and signed-out each need their own sentence.
      setError(describeFailure(t, caught));
    } finally {
      setBusy(false);
    }
  }

  async function remove(id: string) {
    setBusy(true);
    setError(null);
    try {
      await api.del(`/v1/triggers/${id}`);
      await load();
    } catch (caught) {
      // The shared helper draws the distinctions this did not: rate-limited,
      // unavailable and signed-out each need their own sentence.
      setError(describeFailure(t, caught));
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      {loadError ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText} accessibilityRole="alert">
            {loadError}
          </Text>
        </View>
      ) : null}
      <Text style={styles.h1} accessibilityRole="header">{t('trigger.title')}</Text>
      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}
      <Text style={styles.lede}>{view?.intro ?? t('trigger.intro')}</Text>

      {view?.triggers.length ? (
        view.triggers.map((trigger) => (
          <View style={styles.card} key={trigger.id}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
              <Text style={[styles.h3, { flexShrink: 1 }]} accessibilityRole="header">{trigger.label}</Text>
              <TouchableOpacity onPress={() => void remove(trigger.id)} disabled={busy}>
                <Text style={styles.muted}>{t('action.delete')}</Text>
              </TouchableOpacity>
            </View>
            {/* The chain, laid out as a chain. Seeing the links in order is the
                entire therapeutic point of this screen. */}
            {CHAIN.filter((key) => trigger.chain[key]).map((key, index) => (
              <View style={styles.step} key={key}>
                <Text style={styles.stepNumber}>{index + 1}</Text>
                <Text style={[styles.body, { flexShrink: 1 }]}>
                  <Text style={{ color: colors.textFaint }}>{t(`trigger.step.${key}`)}: </Text>
                  {trigger.chain[key]}
                </Text>
              </View>
            ))}
            <Text style={styles.muted}>{t('trigger.whereToBreak')}</Text>
          </View>
        ))
      ) : (
        <Text style={styles.muted}>{t('trigger.empty')}</Text>
      )}

      <Text style={styles.h2} accessibilityRole="header">{t('trigger.add').toUpperCase()}</Text>
      <View style={styles.card}>
        <Text style={styles.label}>{t('trigger.label')}</Text>
        <TextInput
          style={styles.input}
          value={label}
          onChangeText={setLabel}
          placeholderTextColor={colors.textFaint}
        />
        {CHAIN.map((key) => (
          <View key={key}>
            <Text style={styles.label}>{t(`trigger.step.${key}`)}</Text>
            <TextInput
              style={styles.input}
              value={chain[key] ?? ''}
              onChangeText={(value) => setChain((current) => ({ ...current, [key]: value }))}
              placeholderTextColor={colors.textFaint}
            />
          </View>
        ))}
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => void add()}
          disabled={busy || !label.trim()}
        >
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>{t('action.save')}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
