import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{
      headerShown: false, // This hides the header for all screens in the auth group
      animation: 'fade', // Optional: adds a nice fade animation between screens
    }} />
  );
}
