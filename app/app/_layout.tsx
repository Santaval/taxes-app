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

export default function RootLayout() {
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
            <Stack screenOptions={{headerShown: false}}/>
            <StatusBar style={colorScheme === 'dark' ? 'light' : 'dark'} />
          </TransactionsProvider>
        </DateRangeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
