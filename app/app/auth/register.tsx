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
import { Link } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();

  const handleLogin = async () => {
    try {
      await register(email, password);
    } catch (error) {
      console.error('Error al crear cuenta:', error);
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
          {/* Logo y título */}
          <View style={styles.logoContainer}>
            <FontAwesome5 
              name="file-invoice-dollar" 
              size={60} 
              color={Colors.primary} 
            />
            <Text style={styles.title}>TributoCR</Text>
            <Text style={styles.subtitle}>Tu asistente tributario</Text>
          </View>

          {/* Formulario */}
          <View style={styles.formContainer}>
            <View style={styles.inputContainer}>
              <FontAwesome5 
                name="envelope" 
                size={20} 
                color={Colors.primary} 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={styles.inputContainer}>
              <FontAwesome5 
                name="lock" 
                size={20} 
                color={Colors.primary} 
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

    
            <TouchableOpacity 
              style={styles.loginButton}
              onPress={handleLogin}
            >
              <Text style={styles.loginButtonText}>Crear cuenta</Text>
            </TouchableOpacity>

            <View style={styles.divider}>
              <View style={styles.dividerLine} />
              <Text style={styles.dividerText}>o</Text>
              <View style={styles.dividerLine} />
            </View>

            <Link href="/auth/login" asChild>
              <TouchableOpacity style={styles.registerButton}>
                <Text style={styles.registerButtonText}>Iniciar sesión</Text>
              </TouchableOpacity>
            </Link>
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
    justifyContent: 'center',
    padding: Spacing.xl,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: Spacing.xl * 2,
  },
  title: {
    fontSize: Typography.size.xl * 1.5,
    fontWeight: 'bold',
    color: Colors.primary,
    marginTop: Spacing.md,
  },
  subtitle: {
    fontSize: Typography.size.md,
    color: Colors.text,
    marginTop: Spacing.xs,
  },
  formContainer: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.md,
    marginBottom: Spacing.lg,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: Spacing.xl,
  },
  forgotPasswordText: {
    color: Colors.primary,
    fontSize: Typography.size.md,
  },
  loginButton: {
    backgroundColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    ...Shadows.default,
  },
  loginButtonText: {
    color: 'white',
    fontSize: Typography.size.md,
    fontWeight: 'bold',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: Spacing.xl,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: Colors.text,
    opacity: 0.2,
  },
  dividerText: {
    marginHorizontal: Spacing.md,
    color: Colors.text,
    fontSize: Typography.size.md,
  },
  registerButton: {
    borderWidth: 2,
    borderColor: Colors.primary,
    padding: Spacing.lg,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  registerButtonText: {
    color: Colors.primary,
    fontSize: Typography.size.md,
    fontWeight: 'bold',
  },
});
