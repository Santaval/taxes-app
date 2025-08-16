import React from 'react';
import TransactionList from '@/components/transactions/TransactionList';
import { useTransactions } from '@/contexts/TransactionsContext';
import ScreenLayout from '@/components/ui/ScreenLayout';
import FinancialSummary from '@/components/home/FinancialSummary';

export default function Expenses() {
  const { expenses } = useTransactions();

  return (
    <ScreenLayout
      title='Gastos'
      headerContent={<FinancialSummary hideIva />}
      showDateRangePicker
    >
      <TransactionList transactions={expenses} />
    </ScreenLayout>
  );
}
