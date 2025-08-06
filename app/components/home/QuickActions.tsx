import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Colors, Spacing, BorderRadius, Typography, Shadows } from '../../config/theme'
import { FontAwesome5 } from '@expo/vector-icons'
import { router } from 'expo-router'

interface QuickAction {
  id: string;
  label: string;
  icon: string;
  route: string;
  color: string;
}

const QUICK_ACTIONS: QuickAction[] = [
  {
    id: 'new-invoice',
    label: 'Nueva Factura',
    icon: 'file-invoice',
    route: '/invoices/new',
    color: '#4CAF50', // Verde suave
  },
  {
    id: 'invoices',
    label: 'Mis Facturas',
    icon: 'file-alt',
    route: '/invoices',
    color: '#2196F3', // Azul suave
  },
  {
    id: 'expenses',
    label: 'Gastos',
    icon: 'money-bill-wave',
    route: '/expenses',
    color: '#FF9800', // Naranja suave
  },
  {
    id: 'taxes',
    label: 'Impuestos',
    icon: 'percentage',
    route: '/taxes',
    color: '#9C27B0', // Púrpura suave
  },
];

export default function QuickActions() {
  const handlePress = (route: string) => {
    router.push(route as never);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
      <View style={styles.grid}>
        {QUICK_ACTIONS.map((action) => (
          <TouchableOpacity
            key={action.id}
            style={styles.actionButton}
            onPress={() => handlePress(action.route)}
            activeOpacity={0.7}
          >
            <View style={[styles.iconContainer, { backgroundColor: action.color + '15' }]}>
              <FontAwesome5 
                name={action.icon} 
                size={24} 
                color={action.color}
              />
            </View>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.lg,
    backgroundColor: 'white',
    borderRadius: BorderRadius.lg,
    marginHorizontal: Spacing.md,
    marginTop: Spacing.lg,
    ...Shadows.default,
  },
  sectionTitle: {
    fontSize: Typography.size.md,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.lg,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: Spacing.md,
  },
  actionButton: {
    width: '38%', // Permite dos botones por fila con espacio entre ellos
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.md,
    padding: Spacing.md,
    alignItems: 'center',
    ...Shadows.default,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  actionLabel: {
    fontSize: Typography.size.xs,
    color: Colors.text,
    fontWeight: '500',
    textAlign: 'center',
  },
});
