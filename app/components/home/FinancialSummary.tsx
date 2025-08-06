import React from 'react';
import { StyleSheet, View, Text} from 'react-native';
import { BorderRadius, Colors, Spacing } from '@/config/theme';
import formatCurrency from '@/utils/currency';
import useReport from '@/hooks/useReport';


export default function FinancialSummary() {
  const { reportData:balanceReport } = useReport("balance")
  const { reportData:ivaReport } = useReport('iva');



  return (
      <View style={styles.statsContainer}>
       <View style={styles.statsRow}>
          <StatItem label="Ingresos" value={balanceReport?.income || 0} isIncome={true} />
          <StatItem label="Gastos" value={balanceReport?.expenses || 0} isIncome={false} />
          <StatItem label="Balance" value={balanceReport?.balance || 0} isIncome={(balanceReport?.balance || 0) >= 0} />
       </View>

        <View style={styles.statsRow}>
          <StatItem label="IVA Cobrado" value={ivaReport?.vatCharged || 0} isIncome={true} />
        <StatItem label="IVA Deducible" value={ivaReport?.vatDeductible || 0} isIncome={false} />
        <StatItem label="IVA Neto" value={ivaReport?.vatNet || 0} isIncome={(ivaReport?.vatNet || 0) >= 0} />
        </View>
      </View>
  );
}



function StatItem ({ label, value, isIncome }: { label: string; value: number; isIncome: boolean }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={[styles.statValue, isIncome ? styles.incomeText : styles.expensesText]}>
        {formatCurrency(value)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    backgroundColor: Colors.primaryDark,
    borderRadius: BorderRadius.lg,
    paddingVertical: Spacing.lg,
    flexWrap: 'wrap',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: Spacing.md,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    width: '33%',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.white,
    marginBottom: 4,
  },
  statValue: {
    fontSize: 14,
    fontWeight: '600',
  },
  incomeText: {
    color: Colors.white,
  },
  expensesText: {
    color: Colors.white,
  },
  chartContainer: {
    alignItems: 'center',
  },
});

        


