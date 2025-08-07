import React from 'react';
import TransactionList from '@/components/transactions/TransactionList';
import { useTransactions } from '@/contexts/TransactionsContext';
import ScreenLayout from '@/components/ui/ScreenLayout';
import FinancialSummary from '@/components/home/FinancialSummary';
import { Link } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { Colors } from '@/config/theme';

export default function Transactions() {
  const { transactions } = useTransactions();

  return (
    <ScreenLayout
      title='Transacciones'
      headerContent={
        <>
          <FinancialSummary hideIva />
        </>
      }
      showDateRangePicker
    >
      <Link
        href='/transactions/new'
        style={{ marginBottom: 16, alignItems: 'center', flexDirection: 'row' }}
      >
        <View style={styles.addButton}>
          <IconSymbol name='plus.circle.fill' size={15} color={'white'} />
          <Text style={{ marginLeft: 8, color: Colors.white }}>Agregar</Text>
        </View>
      </Link>
      <TransactionList transactions={transactions} />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
});
