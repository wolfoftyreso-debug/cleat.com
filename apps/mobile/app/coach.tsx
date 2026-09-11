import { useEffect, useState } from 'react';
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

export default function CoachScreen() {
  const { t } = useSession();
  const [messages, setMessages] = useState<Bubble[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    void api
      .get<{ messages: { role: 'user' | 'assistant'; content: string }[] }>('/v1/coach/history')
      .then((response) =>
        setMessages(response.messages.map((m) => ({ role: m.role, content: m.content }))),
      )
      .catch(() => undefined);
  }, []);

  async function send() {
    const message = draft.trim();
    if (!message || busy) return;
    setDraft('');
    setMessages((current) => [...current, { role: 'user', content: message }]);
    setBusy(true);
    try {
      const response = await api.post<CoachResponse>('/v1/coach/message', { message });
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
      // The local coach lives on the server, so if we cannot reach it at all the
      // honest thing is to say so and point back at the tools.
      setMessages((current) => [...current, { role: 'assistant', content: t('coach.offline') }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={90}
    >
      <ScrollView contentContainerStyle={styles.content}>
        {messages.length === 0 ? (
          <Text style={styles.lede}>{t('coach.greeting.default')}</Text>
        ) : null}

        {messages.map((bubble, index) => (
          <View key={index} style={{ gap: 8 }}>
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
                    onPress={() =>
                      resource.contact
                        ? void Linking.openURL(`tel:${resource.contact.replace(/\s/g, '')}`)
                        : undefined
                    }
                  >
                    <Text style={styles.body}>
                      {resource.label} {resource.contact}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>
        ))}

        {busy ? <Text style={styles.muted}>{t('coach.thinking')}</Text> : null}
      </ScrollView>

      <View style={{ padding: 16, gap: 10, borderTopWidth: 1, borderTopColor: colors.border }}>
        <TextInput
          style={[styles.input, { minHeight: 60 }]}
          value={draft}
          onChangeText={setDraft}
          placeholder={t('coach.placeholder')}
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
      </View>
    </KeyboardAvoidingView>
  );
}
