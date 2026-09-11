import { useRouter } from 'expo-router';
import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { api } from '../src/api';
import { useSession } from '../src/session';
import { colors, styles } from '../src/theme';

const SCALE = [0, 2, 4, 6, 8, 10] as const;

function Scale({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (next: number) => void;
}) {
  return (
    <View style={{ marginBottom: 14 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {SCALE.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, value === option ? styles.chipSelected : null]}
            accessibilityRole="button"
            accessibilityState={{ selected: value === option }}
            onPress={() => onChange(option)}
          >
            <Text style={[styles.chipText, value === option ? styles.chipTextSelected : null]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

export default function CheckInScreen() {
  const { t } = useSession();
  const router = useRouter();
  const [kind, setKind] = useState<'morning' | 'evening'>(
    new Date().getHours() < 15 ? 'morning' : 'evening',
  );
  const [mood, setMood] = useState(6);
  const [sleepQuality, setSleepQuality] = useState(6);
  const [stress, setStress] = useState(4);
  const [cravingIntensity, setCravingIntensity] = useState(2);
  const [text, setText] = useState('');
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  async function save() {
    setBusy(true);
    try {
      const now = new Date();
      // The device's local day, not the server's UTC one — otherwise an evening
      // check-in east of Greenwich lands on tomorrow.
      const day = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(
        now.getDate(),
      ).padStart(2, '0')}`;

      await api.post('/v1/checkins', {
        kind,
        day,
        mood,
        sleepQuality,
        stress,
        cravingIntensity,
        biggestRisk: kind === 'morning' ? text : null,
        wentWell: kind === 'evening' ? text : null,
      });
      setSaved(true);
      setTimeout(() => router.back(), 700);
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h1} accessibilityRole="header">
        {t(kind === 'morning' ? 'checkin.morning.title' : 'checkin.evening.title')}
      </Text>

      <View style={styles.row}>
        {(['morning', 'evening'] as const).map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.chip, kind === option ? styles.chipSelected : null]}
            accessibilityRole="button"
            accessibilityState={{ selected: kind === option }}
            onPress={() => setKind(option)}
          >
            <Text style={[styles.chipText, kind === option ? styles.chipTextSelected : null]}>
              {t(`checkin.${option}.title`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={[styles.card, { marginTop: 14 }]}>
        <Scale label={t('checkin.mood')} value={mood} onChange={setMood} />
        <Scale label={t('checkin.sleep')} value={sleepQuality} onChange={setSleepQuality} />
        <Scale label={t('checkin.stress')} value={stress} onChange={setStress} />
        <Scale
          label={t('checkin.craving')}
          value={cravingIntensity}
          onChange={setCravingIntensity}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>
          {t(kind === 'morning' ? 'checkin.biggestRisk' : 'checkin.wentWell')}
        </Text>
        <TextInput
          style={styles.input}
          value={text}
          onChangeText={setText}
          placeholderTextColor={colors.textFaint}
        />
      </View>

      <TouchableOpacity
        style={[styles.button, styles.buttonPrimary]}
        onPress={() => void save()}
        disabled={busy}
      >
        <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
          {saved ? t('checkin.saved') : t('action.save')}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
