import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Share, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ApiError, api, tokenStore, type PrivacySummary } from '../src/api';
import { TwoFactor } from '../src/TwoFactor';
import { useSession } from '../src/session';
import { colors, styles } from '../src/theme';

/** Above this, a share sheet is a poor way to carry a document. */
const LARGE_EXPORT_BYTES = 200_000;

/**
 * Settings, and the three controls that are the product's actual privacy
 * promise: a second factor, an export, and erasure.
 *
 * The phone had none of them. A person who only uses the phone could not turn
 * two-step sign-in on, could not get a copy of their own data, and could not
 * delete their account — which makes "clear data control" true of the web
 * client and false of the product.
 */
export default function SettingsScreen() {
  const { user, loading, t, signOut, reload } = useSession();
  const router = useRouter();
  const [confirm, setConfirm] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [summary, setSummary] = useState<PrivacySummary | null>(null);

  useEffect(() => {
    if (!user) return;
    void api
      .get<PrivacySummary>('/v1/privacy/summary')
      .then(setSummary)
      // A transparency panel that cannot load must not take the delete button
      // down with it; the rest of this screen matters more.
      .catch(() => setSummary(null));
  }, [user]);

  useEffect(() => {
    if (!loading && !user) router.replace('/');
  }, [loading, user, router]);

  if (!user) return null;

  const deleteWord = t('privacy.deleteWord');

  function report(caught: unknown, fallback = 'common.error') {
    setError(caught instanceof ApiError ? t(fallback) : t('common.errorOffline'));
  }

  async function setLocale(locale: 'sv' | 'en') {
    setError(null);
    try {
      await api.patch('/v1/me', { locale });
      await reload();
    } catch (caught) {
      report(caught);
    }
  }

  async function setCountry(country: string) {
    setError(null);
    try {
      await api.patch('/v1/me', { country });
      await reload();
    } catch (caught) {
      report(caught);
    }
  }

  /**
   * The export, handed to the share sheet.
   *
   * There is no file system dialog on a phone, so the document goes out through
   * whatever the person already uses to keep things — notes, mail, a password
   * manager, a cloud drive. Very large exports get a warning rather than a
   * silent truncation: some receiving apps cut long text, and the one copy of
   * somebody's recovery record is the wrong thing to shorten without saying so.
   */
  async function exportData() {
    setBusy(true);
    setError(null);
    setMessage(null);
    try {
      const data = await api.get<unknown>('/v1/privacy/export');
      const json = JSON.stringify(data, null, 2);
      const bytes = json.length;
      await Share.share({ message: json, title: t('privacy.exportShare') });
      setMessage(
        bytes > LARGE_EXPORT_BYTES
          ? t('privacy.exportLarge', { kilobytes: Math.round(bytes / 1000) })
          : t('privacy.exportDone'),
      );
    } catch (caught) {
      report(caught);
    } finally {
      setBusy(false);
    }
  }

  /**
   * Erasure. The word stops an accident; the password stops somebody else who
   * picked up the phone, which on a phone is the likelier of the two.
   */
  async function deleteAccount() {
    setBusy(true);
    setError(null);
    try {
      await api.del('/v1/privacy/account', { confirm, password });
      await tokenStore.clear();
      router.replace('/');
    } catch (caught) {
      setError(
        caught instanceof ApiError && caught.status === 401
          ? t('privacy.deleteWrongPassword')
          : t('common.error'),
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h1} accessibilityRole="header">{t('settings.title')}</Text>

      {message ? (
        <View style={styles.card}>
          <Text style={styles.body}>{message}</Text>
        </View>
      ) : null}
      {error ? (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      ) : null}

      <Text style={styles.h2} accessibilityRole="header">{t('settings.language').toUpperCase()}</Text>
      <View style={styles.row}>
        {(['sv', 'en'] as const).map((code) => (
          <TouchableOpacity
            key={code}
            style={[styles.chip, user.locale === code ? styles.chipSelected : null]}
            accessibilityRole="button"
            accessibilityState={{ selected: user.locale === code }}
            onPress={() => void setLocale(code)}
          >
            <Text
              style={[styles.chipText, user.locale === code ? styles.chipTextSelected : null]}
            >
              {t(`settings.language.${code}`)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.h2} accessibilityRole="header">{t('settings.country').toUpperCase()}</Text>
      <View style={styles.row}>
        {['SE', 'US', 'GB'].map((code) => (
          <TouchableOpacity
            key={code}
            style={[styles.chip, user.country === code ? styles.chipSelected : null]}
            accessibilityRole="button"
            accessibilityState={{ selected: user.country === code }}
            onPress={() => void setCountry(code)}
          >
            <Text
              style={[styles.chipText, user.country === code ? styles.chipTextSelected : null]}
            >
              {code}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TwoFactor />

      <Text style={styles.h2} accessibilityRole="header">{t('privacy.title').toUpperCase()}</Text>
      <View style={styles.card}>
        <Text style={styles.body}>{t('privacy.principles')}</Text>
        <TouchableOpacity style={styles.button} onPress={() => void exportData()} disabled={busy}>
          <Text style={styles.buttonText}>{t('privacy.export')}</Text>
        </TouchableOpacity>
      </View>

      {/* Counted from the database rather than described in prose, and the
          sharing answers come from the server: a client that hard-codes "we
          never sell your data" keeps saying so in a deployment that does. */}
      {summary ? (
        <>
          <Text style={styles.h2} accessibilityRole="header">{t('privacy.storedTitle').toUpperCase()}</Text>
          <View style={styles.card}>
            {summary.whatWeStore.map((row) => (
              <View
                key={row.category}
                style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}
              >
                <Text style={[styles.body, { flexShrink: 1 }]}>
                  {t(`privacy.category.${row.category}`)}
                </Text>
                <Text style={styles.muted}>{row.count}</Text>
              </View>
            ))}
          </View>

          <Text style={styles.h2} accessibilityRole="header">{t('privacy.sharingTitle').toUpperCase()}</Text>
          <View style={styles.card}>
            {(Object.keys(summary.sharing) as (keyof PrivacySummary['sharing'])[]).map((key) => (
              <View
                key={key}
                style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}
              >
                <Text style={[styles.body, { flexShrink: 1 }]}>{t(`privacy.sharing.${key}`)}</Text>
                <Text style={summary.sharing[key] ? styles.body : styles.muted}>
                  {t(summary.sharing[key] ? 'privacy.sharing.yes' : 'privacy.sharing.no')}
                </Text>
              </View>
            ))}
          </View>
        </>
      ) : null}

      {/* Deletion is a first-class control, not a support ticket. Recovery data
          in the wrong hands costs people jobs and custody. */}
      <View style={[styles.card, styles.cardWarning]}>
        <Text style={styles.h3} accessibilityRole="header">{t('privacy.delete')}</Text>
        <Text style={styles.body}>{t('privacy.deleteConfirm')}</Text>
        <TextInput
          style={styles.input}
          value={confirm}
          onChangeText={setConfirm}
          autoCapitalize="characters"
          placeholder={deleteWord}
          placeholderTextColor={colors.textFaint}
        />
        <Text style={styles.label}>{t('privacy.deletePassword')}</Text>
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          textContentType="password"
          placeholderTextColor={colors.textFaint}
        />
        <Text style={styles.muted}>{t('privacy.deletePasswordWhy')}</Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => void deleteAccount()}
          disabled={busy || confirm !== deleteWord || password.length === 0}
        >
          <Text style={[styles.buttonText, { color: '#ffb9bb' }]}>{t('action.delete')}</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/kris')}>
        <Text style={styles.buttonText}>{t('safety.resourcesTitle')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => router.push('/nara')}>
        <Text style={styles.buttonText}>{t('near.title')}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => void signOut()}>
        <Text style={styles.buttonText}>{t('auth.signOut')}</Text>
      </TouchableOpacity>

      <Text style={[styles.muted, { marginTop: 20 }]}>{t('safety.disclaimer')}</Text>
    </ScrollView>
  );
}
