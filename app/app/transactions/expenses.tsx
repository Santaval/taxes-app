import React from 'react'
import TransactionList from '@/components/transactions/TransactionList'
import { useTransactions } from '@/contexts/TransactionsContext'
import ScreenLayout from '@/components/ui/ScreenLayout'


export default function Transactions() {
  const { expenses } = useTransactions();
  return (
    <ScreenLayout
      title='Gastos'
      headerContent={null}
    >
      <TransactionList 
        transactions={expenses}
      />
    </ScreenLayout>
  );
}
