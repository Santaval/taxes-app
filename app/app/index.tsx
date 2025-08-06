import { Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence,
  Easing
} from 'react-native-reanimated'
import { FontAwesome5 } from '@expo/vector-icons'
import { Colors, Spacing, BorderRadius, Typography, Shadows, IconSizes } from '../config/theme'
import { router } from 'expo-router'

export default function LoadingScreen() {
  const scale = useSharedValue(1)
  const rotation = useSharedValue(0)

  useEffect(() => {
    // Suave animación de pulsación
    scale.value = withRepeat(
      withSequence(
        withTiming(1.1, { duration: 1000, easing: Easing.bezier(0.4, 0, 0.2, 1) }),
        withTiming(1, { duration: 1000, easing: Easing.bezier(0.4, 0, 0.2, 1) })
      ),
      -1,
      true
    )

    // Rotación suave del ícono
    rotation.value = withRepeat(
      withTiming(360, { 
        duration: 4000,
        easing: Easing.linear 
      }),
      -1,
      false
    )

    // Redirigir a la pantalla de login después de 2 segundos
    const timer = setTimeout(() => {
      router.replace('/auth/login')
    }, 500)

    return () => clearTimeout(timer)
  }, [scale, rotation])

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotateZ: `${rotation.value}deg` }
      ]
    }
  })

  return (
    <LinearGradient
      colors={[Colors.gradientColors.start, Colors.gradientColors.middle, Colors.gradientColors.end]}
      style={styles.container}
    >
      <Animated.View style={[styles.iconContainer, iconStyle]}>
        <FontAwesome5 
          name="calculator" 
          size={IconSizes.lg} 
          color={Colors.primary}
        />
      </Animated.View>
      <Text style={styles.loadingText}>Cargando...</Text>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  iconContainer: {
    padding: Spacing.lg,
    borderRadius: BorderRadius.lg,
    backgroundColor: Colors.componentBg,
    ...Shadows.default,
  },
  loadingText: {
    marginTop: Spacing.xl,
    fontSize: Typography.size.lg,
    color: Colors.text,
    fontFamily: 'System',
    letterSpacing: Typography.letterSpacing.wide,
  },
})