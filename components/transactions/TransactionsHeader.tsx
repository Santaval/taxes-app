import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform } from 'react-native';
import { Colors, Spacing, Typography, BorderRadius, Shadows } from '@/config/theme';
import { FontAwesome5 } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TransactionsHeaderProps {
  onFilterPress?: () => void;
  onSearchPress?: () => void;
}

export default function TransactionsHeader({ onFilterPress, onSearchPress }: TransactionsHeaderProps) {

  return (
    <View style={[styles.container]}>
      <View style={styles.headerContent}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Historial de transacciones</Text>
        </View>
        
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onSearchPress}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="search" size={18} color={Colors.text} />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.actionButton}
            onPress={onFilterPress}
            activeOpacity={0.7}
          >
            <FontAwesome5 name="filter" size={18} color={Colors.text} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.componentBg,
    ...Shadows.default,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    minHeight: 60,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    paddingRight: 80, // Compensar el espacio de los botones para centrar el título
  },
  title: {
    fontSize: Typography.size.lg,
    fontWeight: '600',
    color: Colors.text,
    textAlign: 'center',
  },
  actionsContainer: {
    flexDirection: 'row',
    position: 'absolute',
    right: Spacing.lg,
    gap: Spacing.sm,
  },
  actionButton: {
    width: 40,
    height: 40,
    borderRadius: BorderRadius.circle,
    backgroundColor: Colors.lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
});
