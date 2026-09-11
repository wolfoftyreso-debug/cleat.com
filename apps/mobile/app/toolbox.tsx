import { useEffect, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { api } from '../src/api';
import { useSession } from '../src/session';
import { styles } from '../src/theme';

interface Tool {
  id: string;
  category: 'acute' | 'cognitive' | 'behavioural' | 'social' | 'life';
  minutes: number;
  lowEffort: boolean;
  label: string;
  categoryLabel: string;
}

const ORDER: Tool['category'][] = ['acute', 'cognitive', 'behavioural', 'social', 'life'];

/**
 * The toolbox.
 *
 * Every entry is a verb — something you can start within the next sixty
 * seconds. Nothing in here is "reflect on your journey".
 *
 * Acute comes first and is never collapsed, because the one time somebody opens
 * this screen in a hurry is the time they need that section.
 */
export default function ToolboxScreen() {
  const { user, t } = useSession();
  const [tools, setTools] = useState<Tool[]>([]);
  const [onlyQuick, setOnlyQuick] = useState(false);

  useEffect(() => {
    if (!user) return;
    void api
      .get<{ tools: Tool[] }>('/v1/toolbox')
      .then((response) => setTools(response.tools))
      .catch(() => setTools([]));
  }, [user]);

  const visible = onlyQuick ? tools.filter((tool) => tool.lowEffort) : tools;

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.h1} accessibilityRole="header">{t('toolbox.title')}</Text>

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.chip, !onlyQuick ? styles.chipSelected : null]}
          accessibilityRole="button"
          accessibilityState={{ selected: !onlyQuick }}
          onPress={() => setOnlyQuick(false)}
        >
          <Text style={[styles.chipText, !onlyQuick ? styles.chipTextSelected : null]}>
            {t('toolbox.all')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.chip, onlyQuick ? styles.chipSelected : null]}
          accessibilityRole="button"
          accessibilityState={{ selected: onlyQuick }}
          onPress={() => setOnlyQuick(true)}
        >
          <Text style={[styles.chipText, onlyQuick ? styles.chipTextSelected : null]}>
            {t('toolbox.quickOnly')}
          </Text>
        </TouchableOpacity>
      </View>

      {ORDER.map((category) => {
        const inCategory = visible.filter((tool) => tool.category === category);
        if (inCategory.length === 0) return null;
        return (
          <View key={category}>
            <Text style={styles.h2} accessibilityRole="header">{inCategory[0]?.categoryLabel.toUpperCase()}</Text>
            <View style={styles.card}>
              {inCategory.map((tool) => (
                <View
                  key={tool.id}
                  style={{ flexDirection: 'row', justifyContent: 'space-between', gap: 12 }}
                >
                  <Text style={[styles.body, { flexShrink: 1 }]}>{tool.label}</Text>
                  <Text style={styles.muted}>{t('toolbox.minutes', { minutes: tool.minutes })}</Text>
                </View>
              ))}
            </View>
          </View>
        );
      })}

      {tools.length === 0 ? <Text style={styles.muted}>{t('common.loading')}</Text> : null}
    </ScrollView>
  );
}
