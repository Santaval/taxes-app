import { StyleSheet } from 'react-native'
import React from 'react'
import TransactionsHeader from '@/components/transactions/TransactionsHeader'
import TransactionList from '@/components/transactions/TransactionList'
import { Colors } from '@/config/theme'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useTransactions } from '@/contexts/TransactionsContext'


export default function Transactions() {
  const { transactions } = useTransactions();
  const handleFilterPress = () => {
    // Implementar lógica de filtrado
  };

  const handleSearchPress = () => {
    // Implementar lógica de búsqueda
  };


  return (
    <SafeAreaView style={styles.container}>
      <TransactionsHeader 
        onFilterPress={handleFilterPress}
        onSearchPress={handleSearchPress}
      />
      <TransactionList 
        transactions={transactions}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.componentBg,
  },
});