import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { colors } from '../src/theme';
import { SessionProvider, useSession } from '../src/session';

/**
 * The stack, inside the session provider so that it can read the locale.
 *
 * Every one of these screens used to be titled with the literal string
 * "Cleat". On iOS the navigation title is the first thing announced on arrival
 * and the name the back button takes from the previous screen, so the app told
 * you "Cleat" wherever you were and offered "Back to Cleat" whatever you were
 * going back to. The titles are also the only place in the mobile app where a
 * string was hard-coded in one language.
 */
function AppStack() {
  const { t } = useSession();

  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerTintColor: colors.text,
        headerTitleStyle: { fontWeight: '700' },
        contentStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{ headerShown: false }} />
      <Stack.Screen name="craving" options={{ title: t('nav.title.craving') }} />
      <Stack.Screen name="relapse" options={{ title: t('relapse.title') }} />
      <Stack.Screen name="coach" options={{ title: t('coach.title') }} />
      <Stack.Screen name="checkin" options={{ title: t('nav.title.checkin') }} />
      <Stack.Screen name="rebuild" options={{ title: t('rebuild.title') }} />
      <Stack.Screen name="patterns" options={{ title: t('indicator.title') }} />
      <Stack.Screen name="plan" options={{ title: t('nav.plan') }} />
      <Stack.Screen name="struggling" options={{ title: t('nav.title.struggling') }} />
      <Stack.Screen name="toolbox" options={{ title: t('toolbox.title') }} />
      <Stack.Screen name="triggers" options={{ title: t('trigger.title') }} />
      <Stack.Screen name="settings" options={{ title: t('settings.title') }} />
      {/* Registered outside any auth gate on purpose: the moment somebody
          needs this screen, being asked to sign in first is a wall. */}
      <Stack.Screen name="kris" options={{ title: t('nav.title.crisis') }} />
      {/* Cleat Nära, also outside the auth gate: a relative who has never
          heard of this app should be able to read it without registering
          for a product about somebody else's drinking. */}
      <Stack.Screen name="nara" options={{ title: t('nav.title.near') }} />
      <Stack.Screen name="nara-samtal" options={{ title: t('nav.title.nearTalk') }} />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <SessionProvider>
        <StatusBar style="light" />
        <AppStack />
      </SessionProvider>
    </SafeAreaProvider>
  );
}
