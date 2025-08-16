import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';

import { useColorScheme } from '@/hooks/useColorScheme';
import { AuthProvider } from '@/contexts/AuthContext';
import { TransactionsProvider } from '@/contexts/TransactionsContext';
import { DateRangeProvider } from '@/contexts/DateRangeContext';
import { ClientsProvider } from '@/contexts/ClientsContext';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://8ece74c379f0fd5503eb9052aa3f0f67@o4507159519887360.ingest.us.sentry.io/4509851370848256',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <AuthProvider>
        <DateRangeProvider>
          <TransactionsProvider>
            <ClientsProvider>
              <Stack screenOptions={{headerShown: false}}/>
              <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
            </ClientsProvider>
          </TransactionsProvider>
        </DateRangeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
});