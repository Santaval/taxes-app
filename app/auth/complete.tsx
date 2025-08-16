import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../config/theme';
import { router } from 'expo-router';
import AuthService from '@/services/AuthService';

export default function CompleteProfileScreen() {
  const [name, setName] = useState('');

  const handleComplete = async () => {
    if (name.trim()) {
      try {
        await AuthService.completeProfile({name});
        router.replace('/(tabs)/home'); // Redirect to main app
      } catch (error) {
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient
        colors={[Colors.gradientColors.start, Colors.gradientColors.middle, Colors.gradientColors.end]}
        style={styles.gradient}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            {/* Ilustración o ícono */}
            <View style={styles.iconContainer}>
              <FontAwesome5 
                name="user-circle" 
                size={80} 
                color={Colors.primary} 
              />
            </View>

            {/* Textos de bienvenida */}
            <Text style={styles.title}>¡Casi listo!</Text>
            <Text style={styles.subtitle}>
              ¿Cómo te gustaría que te llamemos?
            </Text>

            {/* Input para el nombre */}
            <View style={styles.inputContainer}>
              <FontAwesome5 
                name="user" 
                size={20} 
                color={Colors.primary} 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Tu nombre"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoFocus
              />
            </View>

            {/* Botón de continuar */}
            <TouchableOpacity 
              style={[
                styles.continueButton,
                !name.trim() && styles.continueButtonDisabled
              ]}
              onPress={handleComplete}
              disabled={!name.trim()}
            >
              <Text style={styles.continueButtonText}>Continuar</Text>
            </TouchableOpacity>

            {/* Texto de salto */}
            <TouchableOpacity 
              style={styles.skipButton}
              onPress={() => router.replace('/(tabs)')}
            >
              <Text style={styles.skipButtonText}>Completar después</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: Spacing.xl,
  },
  title: {
    fontSize: Typography.size.xl,
    fontWeight: 'bold',
    color: Colors.primary,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.size.md,
    color: Colors.text,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.xl,
    width: '100%',
    ...Shadows.default,
  },
  inputIcon: {
    padding: Spacing.md,
  },
  input: {
    flex: 1,
    padding: Spacing.md,
    fontSize: Typography.size.md,
    color: Colors.text,
  },
  continueButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    width: '100%',
    alignItems: 'center',
    ...Shadows.default,
  },
  continueButtonDisabled: {
    opacity: 0.6,
  },
  continueButtonText: {
    color: 'white',
    fontSize: Typography.size.md,
    fontWeight: 'bold',
  },
  skipButton: {
    marginTop: Spacing.xl,
  },
  skipButtonText: {
    color: Colors.text,
    fontSize: Typography.size.md,
    textDecorationLine: 'underline',
  },
});
