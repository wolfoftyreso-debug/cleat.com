import { useCallback, useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { api } from '../src/api';
import { useSession } from '../src/session';
import { styles } from '../src/theme';

type Status = 'untouched' | 'working' | 'steady';

interface Domain {
  id: string;
  label: string;
  description: string;
  status: Status;
  statusLabel: string;
}

interface RebuildView {
  intro: string;
  pickOne: string;
  progress: { steady: number; working: number; total: number };
  suggestion: { domain: string; label: string; reason: string } | null;
  domains: Domain[];
  locked: { id: string; label: string }[];
}

const NEXT: Record<Status, Status> = {
  untouched: 'working',
  working: 'steady',
  steady: 'untouched',
};

/**
 * Rebuild my life on the phone.
 *
 * One suggestion, then the map. Tapping a domain's status cycles it — no forms,
 * no modals. The point is that opening this screen and moving one thing forward
 * takes ten seconds.
 */
export default function RebuildScreen() {
  const { t } = useSession();
  const [view, setView] = useState<RebuildView | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const load = useCallback(async () => {
    try {
      setView(await api.get<RebuildView>('/v1/rebuild'));
    } catch {
      setView(null);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  async function setStatus(domain: string, status: Status) {
    setBusy(domain);
    try {
      await api.put(`/v1/rebuild/${domain}`, { status });
      await load();
    } finally {
      setBusy(null);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h1} accessibilityRole="header">{t('rebuild.title')}</Text>
      <Text style={styles.body}>{view?.intro ?? t('rebuild.intro')}</Text>

      {view?.suggestion ? (
        <View style={[styles.card, styles.cardAccent]}>
          <Text style={styles.label}>{t('rebuild.pickOne').toUpperCase()}</Text>
          <Text style={styles.h3} accessibilityRole="header">{view.suggestion.label}</Text>
          <Text style={styles.body}>{view.suggestion.reason}</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => void setStatus(view.suggestion!.domain, 'working')}
            disabled={busy === view.suggestion.domain}
          >
            <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
              {t('rebuild.status.working')}
            </Text>
          </TouchableOpacity>
        </View>
      ) : null}

      {view?.domains.map((domain) => (
        <TouchableOpacity
          key={domain.id}
          style={styles.card}
          onPress={() => void setStatus(domain.id, NEXT[domain.status])}
          disabled={busy === domain.id}
        >
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}>
            <Text style={styles.h3} accessibilityRole="header">{domain.label}</Text>
            <Text style={styles.muted}>{domain.statusLabel}</Text>
          </View>
          <Text style={styles.body}>{domain.description}</Text>
        </TouchableOpacity>
      ))}

      {/* Locked domains are shown, not hidden. Nothing is being kept from the
          person — it is just not realistic yet at this phase. */}
      {view?.locked.length ? (
        <View style={styles.row}>
          {view.locked.map((domain) => (
            <View key={domain.id} style={[styles.chip, { opacity: 0.5 }]}>
              <Text style={styles.chipText}>{domain.label}</Text>
            </View>
          ))}
        </View>
      ) : null}

      <Text style={[styles.muted, { marginTop: 20 }]}>{t('about.objective')}</Text>
    </ScrollView>
  );
}
