import { StyleSheet } from 'react-native'
import React from 'react'
import TransactionList from '@/components/transactions/TransactionList'
import { Colors } from '@/config/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTransactions } from '@/contexts/TransactionsContext'
import ScreenLayout from '@/components/ui/ScreenLayout'


export default function Transactions() {
  const { transactions } = useTransactions();
  // const handleFilterPress = () => {
  //   // Implementar lógica de filtrado
  // };

  // const handleSearchPress = () => {
  //   // Implementar lógica de búsqueda
  // };


  return (
    <ScreenLayout
      title='Transacciones'
      headerContent={null}
    >
      <TransactionList 
        transactions={transactions}
      />
    </ScreenLayout>
  );
}
