import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '@/config/theme';
import { ThemedView } from '../ThemedView';
import {   } from 'victory-native';


interface FinancialSummaryProps {
  currentMonth?: string;
  income?: number;
  expenses?: number;
}

export default function FinancialSummary({ 
  currentMonth = 'Agosto 2025',
  income = 1500000,
  expenses = 800000 
}: FinancialSummaryProps) {
  const [selectedMonth] = useState(currentMonth);
  const balance = income - expenses;


  const formatCurrency = (amount: number) => {
    return '₡' + amount.toLocaleString('es-CR');
  };


  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Resumen Financiero</Text>
        <TouchableOpacity
          style={styles.monthSelector}
          onPress={() => {
            // Aquí implementar un selector de mes
          }}
        >
          <Text style={styles.monthText}>{selectedMonth} ▼</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Ingresos</Text>
          <Text style={[styles.statValue, styles.incomeText]}>
            {formatCurrency(income)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Gastos</Text>
          <Text style={[styles.statValue, styles.expensesText]}>
            {formatCurrency(expenses)}
          </Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Balance</Text>
          <Text style={[styles.statValue, balance >= 0 ? styles.incomeText : styles.expensesText]}>
            {formatCurrency(balance)}
          </Text>
        </View>
      </View>

    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    padding: 16,
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
