import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { Colors } from '@/config/theme';
import formatCurrency from '@/utils/currency';
import useReport from '@/hooks/useReport';


export default function IvaSummary() {
  const { reportData } = useReport("iva")

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resumen IVA</Text>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>IVA Cobrado</Text>
          <Text style={[styles.statValue, styles.incomeText]}>
            {formatCurrency(reportData?.vatCharged || 0)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>IVA Deducible</Text>
          <Text style={[styles.statValue, styles.expensesText]}>
            {formatCurrency(reportData?.vatDeductible || 0)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>IVA Neto</Text>
          <Text
            style={[
              styles.statValue,
              reportData?.vatNet || 0 >= 0 ? styles.incomeText : styles.expensesText,
            ]}
          >
            {formatCurrency(reportData?.vatNet || 0)}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
    backgroundColor: "#f4f4f4ff",
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
  },
  monthSelector: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: Colors.componentBg,
  },
  monthText: {
    color: Colors.text,
    fontWeight: '500',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.text,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  incomeText: {
    color: Colors.success,
  },
  expensesText: {
    color: Colors.error,
  },
  chartContainer: {
    alignItems: 'center',
  },
});
