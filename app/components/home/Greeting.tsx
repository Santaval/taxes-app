import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { Spacing, Typography } from '@/config/theme';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAuth } from '@/contexts/AuthContext';

export default function Greeting() {
  const { user} = useAuth()
  return (
    <View style={styles.welcomeSection}>
      <Text style={styles.greetingText}>Hola,</Text>
      <Text style={styles.nameText}>{user?.name || 'Usuario'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcomeSection: {
    marginBottom: Spacing.lg,
  },
  greetingText: {
    fontSize: Typography.size.md,
    color: Colors.text,
    opacity: 0.8,
  },
  nameText: {
    fontSize: Typography.size.xl,
    fontWeight: 'bold',
    color: Colors.primary,
  },
});
