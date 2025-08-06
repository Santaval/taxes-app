import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../config/theme'
import { FontAwesome5 } from '@expo/vector-icons'
import { User } from '@/types/User'

interface HomeHeaderProps {
  user: User | null;
  monthlyStats: {
    totalBilled: number;
    totalVAT: number;
  };
}

export default function HomeHeader({ user, monthlyStats }: HomeHeaderProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CR', {
      style: 'currency',
      currency: 'CRC',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <View style={styles.headerContainer}>
      {/* Welcome Message */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greetingText}>Hola,</Text>
        <Text style={styles.nameText}>{user?.name || 'Usuario'}</Text>
      </View>

      {/* Stats Cards */}
      <View style={styles.statsContainer}>
        {/* Total Billed Card */}
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <FontAwesome5 
              name="file-invoice-dollar" 
              size={24} 
              color={Colors.primary} 
            />
          </View>
          <View>
            <Text style={styles.statLabel}>Facturado este mes</Text>
            <Text style={styles.statValue}>
              {formatCurrency(monthlyStats.totalBilled)}
            </Text>
          </View>
        </View>

        {/* VAT Card */}
        <View style={styles.statCard}>
          <View style={styles.statIconContainer}>
            <FontAwesome5 
              name="percentage" 
              size={24} 
              color={Colors.primary} 
            />
          </View>
          <View>
            <Text style={styles.statLabel}>IVA por pagar</Text>
            <Text style={styles.statValue}>
              {formatCurrency(monthlyStats.totalVAT)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    padding: Spacing.lg,
    backgroundColor: 'white',
    borderBottomLeftRadius: BorderRadius.lg,
    borderBottomRightRadius: BorderRadius.lg,
    ...Shadows.default,
  },
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
  statsContainer: {
    flexDirection: 'column',
    gap: Spacing.md,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.lg,
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.md,
    ...Shadows.default,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.gradientColors.middle,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  statLabel: {
    fontSize: Typography.size.sm,
    color: Colors.text,
    opacity: 0.8,
    marginBottom: 4,
  },
  statValue: {
    fontSize: Typography.size.lg,
    fontWeight: 'bold',
    color: Colors.text,
  },
});
