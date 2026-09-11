import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Linking,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { api, type CoachResponse } from '../src/api';
import { useSession } from '../src/session';
import { colors, styles } from '../src/theme';

interface Bubble {
  role: 'user' | 'assistant';
  content: string;
  emergency?: boolean;
  resources?: { key: string; contact: string; label: string }[];
}

/**
 * The sounding board for a relative, on the phone.
 *
 * Starts blank every time and loads no history, unlike the recovery coach.
 * Somebody using this often shares a home — and often a device — with the
 * person they are writing about, and a conversation that reopens where it left
 * off is a page somebody else can scroll.
 */
export default function SupporterTalkScreen() {
  const { user, loading, t } = useSession();
  const router = useRouter();
  const [messages, setMessages] = useState<Bubble[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef<ScrollView | null>(null);

  useEffect(() => {
    if (!loading && !user) router.replace('/');
  }, [loading, user, router]);

  async function send() {
    const message = draft.trim();
    if (!message || busy) return;

    setDraft('');
    setMessages((current) => [...current, { role: 'user', content: message }]);
    setBusy(true);
    try {
      const response = await api.post<CoachResponse>('/v1/coach/message', {
        message,
        // Declared by the client. No classifier could reliably tell "he drank
        // again last night" written by the person from the same sentence
        // written by their partner, and getting it wrong means answering the
        // wrong human being.
        mode: 'supporter',
      });
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: response.reply,
          emergency: response.safety.level === 'emergency',
          resources: response.safety.resources,
        },
      ]);
    } catch {
      setMessages((current) => [...current, { role: 'assistant', content: t('coach.offline') }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        ref={scrollRef}
        style={styles.screen}
        contentContainerStyle={styles.content}
        onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
      >
        {messages.length === 0 ? (
          <>
            <Text style={styles.h1} accessibilityRole="header">{t('near.talkTitle')}</Text>
            <Text style={styles.lede}>{t('near.talkGreeting')}</Text>
            <Text style={styles.muted}>{t('near.talkNotAboutThem')}</Text>
            <Text style={styles.muted}>{t('near.talkNoAdviceOnLeaving')}</Text>
          </>
        ) : null}

        {messages.map((bubble, index) => (
          <View key={index}>
            <View
              style={[
                styles.bubble,
                bubble.role === 'user' ? styles.bubbleUser : styles.bubbleAssistant,
                bubble.emergency ? styles.bubbleEmergency : null,
              ]}
            >
              <Text style={styles.body}>{bubble.content}</Text>
            </View>
            {bubble.resources?.length ? (
              <View style={[styles.card, styles.cardWarning]}>
                <Text style={styles.h3} accessibilityRole="header">{t('safety.resourcesTitle')}</Text>
                {bubble.resources.map((resource) => (
                  <TouchableOpacity
                    key={resource.key}
                    accessibilityRole="button"
                    accessibilityLabel={
                      resource.contact
                        ? t('action.callNumber', {
                            name: resource.label,
                            number: resource.contact,
                          })
                        : resource.label
                    }
                    onPress={() => {
                      if (!resource.contact) return;
                      void Linking.openURL(
                        `tel:${resource.contact.replace(/\s/g, '')}`,
                      ).catch(() => undefined);
                    }}
                  >
                    <Text style={styles.body}>{resource.label}</Text>
                    {resource.contact ? (
                      <Text style={{ color: colors.accent, fontSize: 20, fontWeight: '700' }}>
                        {resource.contact}
                      </Text>
                    ) : null}
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>
        ))}

        {busy ? <Text style={styles.muted}>{t('coach.thinking')}</Text> : null}

        <TextInput
          style={[styles.input, { minHeight: 90 }]}
          value={draft}
          onChangeText={setDraft}
          placeholder={t('near.talkPlaceholder')}
          placeholderTextColor={colors.textFaint}
          multiline
        />
        <TouchableOpacity
          style={[styles.button, styles.buttonPrimary]}
          onPress={() => void send()}
          disabled={busy || !draft.trim()}
        >
          <Text style={[styles.buttonText, styles.buttonTextPrimary]}>{t('coach.send')}</Text>
        </TouchableOpacity>

        <Text style={[styles.muted, { marginTop: 16 }]}>
          {t('coach.notATherapist')} {t('safety.disclaimer')}
        </Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
