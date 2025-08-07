import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Colors, Spacing, BorderRadius, Typography } from '@/config/theme';
import { useDateRange } from '@/contexts/DateRangeContext';

export default function DateRangePicker() {
  const { preset, setPreset } = useDateRange();

  const presets = [
    { id: 'today', label: 'Hoy' },
    { id: 'week', label: 'Semana' },
    { id: 'month', label: 'Mes' },
    { id: 'year', label: 'Año' },
  ] as const;

  return (
    <View style={styles.container}>
      {/* Presets */}
      <View style={styles.presetsContainer}>
        {presets.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[
              styles.presetButton,
              preset === item.id && styles.presetButtonActive,
            ]}
            onPress={() => setPreset(item.id)}
          >
            <Text
              style={[
                styles.presetText,
                preset === item.id && styles.presetTextActive,
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: Spacing.md,
    borderRadius: BorderRadius.lg,
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
  presetsContainer: {
    flexDirection: 'row',
    marginBottom: Spacing.md,
    gap: Spacing.sm,
  },
  presetButton: {
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.md,
    alignItems: 'center',
  },
  presetButtonActive: {
    backgroundColor: Colors.white,
  },
  presetText: {
    fontSize: Typography.size.sm,
    color: Colors.white,
  },
  presetTextActive: {
    color: Colors.primary,
    fontWeight: '600',
  },
  customRangeContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  dateButton: {
    flex: 1,
    padding: Spacing.md,
    backgroundColor: Colors.componentBg,
    borderRadius: BorderRadius.md,
  },
  dateLabel: {
    fontSize: Typography.size.xs,
    color: Colors.secondaryText,
    marginBottom: Spacing.xs,
  },
  dateText: {
    fontSize: Typography.size.sm,
    color: Colors.text,
  },
});
