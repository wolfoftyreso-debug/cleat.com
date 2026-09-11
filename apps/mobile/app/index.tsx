import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { ApiError, api } from '../src/api';
import { useSession } from '../src/session';
import { colors, styles } from '../src/theme';

export default function SignInScreen() {
  const { t, signIn, completeMfa, signUp, user, loading } = useSession();
  const router = useRouter();
  const [mode, setMode] = useState<'signIn' | 'signUp'>('signIn');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  /** Set once the password was accepted and a second factor is still owed. */
  const [challenge, setChallenge] = useState<string | null>(null);
  const [code, setCode] = useState('');
  /** True once a reset link has been asked for, whatever the outcome. */
  const [resetSent, setResetSent] = useState(false);

  useEffect(() => {
    if (!loading && user) router.replace('/home');
  }, [loading, user, router]);

  function describe(caught: unknown): string {
    const map: Record<string, string> = {
      weak_password: 'auth.weakPassword',
      email_taken: 'auth.emailTaken',
      unauthorized: 'auth.invalid',
    };
    return caught instanceof ApiError ? t(map[caught.code] ?? 'common.error') : t('common.error');
  }

  async function submit() {
    setBusy(true);
    setError(null);
    try {
      if (mode === 'signUp') {
        await signUp(email.trim(), password, displayName.trim());
      } else {
        const outcome = await signIn(email.trim(), password);
        if (outcome.status === 'mfa-required') {
          setChallenge(outcome.challenge);
          setPassword('');
        }
      }
    } catch (caught) {
      setError(describe(caught));
    } finally {
      setBusy(false);
    }
  }

  /**
   * Ask for a reset link, using the address already typed above rather than
   * asking for it twice. The answer is the same whether or not that address has
   * an account — who is in recovery is not something this form may confirm — so
   * there is no error branch here on purpose.
   */
  async function requestReset() {
    setBusy(true);
    setError(null);
    try {
      await api.post('/v1/auth/forgot-password', { email: email.trim().toLowerCase() });
    } catch {
      // Silent by design: a rate limit, an unknown address and a mail outage
      // must be indistinguishable from this screen.
    } finally {
      setResetSent(true);
      setBusy(false);
    }
  }

  async function submitCode() {
    if (!challenge) return;
    setBusy(true);
    setError(null);
    try {
      await completeMfa(challenge, code.trim());
    } catch (caught) {
      // A wrong code is not the end of the attempt — the server allows five.
      // Only a challenge that can no longer succeed sends them back to the
      // password.
      const dead = caught instanceof ApiError && caught.code === 'totp_challenge_expired';
      if (dead) {
        setError(t('auth.totpChallengeExpired'));
        setChallenge(null);
        setCode('');
      } else if (caught instanceof ApiError && caught.code === 'totp_invalid_code') {
        setError(t('auth.totpWrongCode'));
        setCode('');
      } else {
        setError(describe(caught));
      }
    } finally {
      setBusy(false);
    }
  }

  if (challenge) {
    return (
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[styles.content, { paddingTop: 70 }]}
      >
        <Text style={styles.wordmark}>{t('app.name').toUpperCase()}</Text>
        <Text style={styles.h1} accessibilityRole="header">{t('auth.totpTitle')}</Text>
        <Text style={styles.lede}>{t('auth.totpPrompt')}</Text>

        <View style={[styles.card, { marginTop: 24 }]}>
          {error ? (
            <View style={styles.errorBanner}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          <Text style={styles.label}>{t('auth.totpCode')}</Text>
          <TextInput
            style={styles.input}
            value={code}
            onChangeText={setCode}
            autoCapitalize="characters"
            // Not a numeric keyboard: recovery codes contain letters, and the
            // number pad would make them impossible to enter.
            textContentType="oneTimeCode"
            autoFocus
            placeholderTextColor={colors.textFaint}
          />
          <TouchableOpacity
            style={[styles.button, styles.buttonPrimary]}
            onPress={() => void submitCode()}
            disabled={busy}
          >
            <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
              {busy ? t('common.loading') : t('auth.signIn')}
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={[styles.muted, { marginTop: 12, textAlign: 'center' }]}>
          {t('auth.totpRecoveryHint')}
        </Text>

        <TouchableOpacity
          onPress={() => {
            setChallenge(null);
            setCode('');
            setError(null);
          }}
        >
          <Text style={[styles.muted, { textAlign: 'center', marginTop: 16 }]}>
            {t('common.back')}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={[styles.content, { paddingTop: 70 }]}>
      <Text style={styles.wordmark}>{t('app.name').toUpperCase()}</Text>
      <Text style={styles.h1} accessibilityRole="header">{t('app.tagline')}</Text>
      <Text style={styles.lede}>{t('app.subtitle')}</Text>

      <View style={[styles.card, { marginTop: 24 }]}>
        {error ? (
          <View style={styles.errorBanner}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}

        {mode === 'signUp' ? (
          <View>
            <Text style={styles.label}>{t('auth.displayName')}</Text>
            <TextInput
              style={styles.input}
              value={displayName}
              onChangeText={setDisplayName}
              placeholderTextColor={colors.textFaint}
            />
          </View>
        ) : null}

        <View>
          <Text style={styles.label}>{t('auth.email')}</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            textContentType="emailAddress"
            placeholderTextColor={colors.textFaint}
          />
        </View>

        <View>
          <Text style={styles.label}>{t('auth.password')}</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            textContentType={mode === 'signUp' ? 'newPassword' : 'password'}
            placeholderTextColor={colors.textFaint}
          />
        </View>

        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => void submit()}
          disabled={busy}
        >
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>
            {busy ? t('common.loading') : t(mode === 'signIn' ? 'auth.signIn' : 'auth.signUp')}
          </Text>
        </TouchableOpacity>
      </View>

      {/* The way back into an account. Without it, forgetting a password on a
          phone-only account meant losing the streak, the autopsies and the
          whole pattern history — while the endpoint that recovers it sat there
          unused. */}
      {mode === 'signIn' ? (
        <TouchableOpacity onPress={() => void requestReset()} disabled={busy || !email.trim()}>
          <Text style={[styles.muted, { textAlign: 'center', marginTop: 16 }]}>
            {t('auth.forgotPassword')}
          </Text>
        </TouchableOpacity>
      ) : null}

      {resetSent ? (
        <View style={[styles.card, styles.cardAccent, { marginTop: 12 }]}>
          <Text style={styles.body}>{t('auth.forgotSent')}</Text>
          <Text style={styles.muted}>{t('auth.forgotMobileHint')}</Text>
        </View>
      ) : null}

      <TouchableOpacity
        onPress={() => {
          setMode(mode === 'signIn' ? 'signUp' : 'signIn');
          setError(null);
        }}
      >
        <Text style={[styles.muted, { textAlign: 'center', marginTop: 12 }]}>
          {t(mode === 'signIn' ? 'auth.noAccount' : 'auth.haveAccount')}{' '}
          {t(mode === 'signIn' ? 'auth.signUp' : 'auth.signIn')}
        </Text>
      </TouchableOpacity>

      {/* Help before an account. Somebody who needs a number right now should
          not have to register first, and should not have to believe that this
          app is the thing that helps them. */}
      <TouchableOpacity
        style={[styles.button, { marginTop: 24 }]}
        onPress={() => router.push('/kris')}
      >
        <Text style={styles.buttonText}>{t('crisis.title')}</Text>
      </TouchableOpacity>

      {/* The relative is not a secondary audience reached through a settings
          menu. Most people carrying this never look for anything for
          themselves, because the problem is framed as somebody else's. */}
      <TouchableOpacity style={styles.button} onPress={() => router.push('/nara')}>
        <Text style={styles.buttonText}>{t('near.title')}</Text>
      </TouchableOpacity>

      <Text style={[styles.muted, { marginTop: 30, textAlign: 'center' }]}>
        {t('safety.disclaimer')}
      </Text>
    </ScrollView>
  );
}
