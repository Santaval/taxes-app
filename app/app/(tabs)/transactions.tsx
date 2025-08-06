import { StyleSheet } from 'react-native'
import React from 'react'
import TransactionsHeader from '@/components/transactions/TransactionsHeader'
import TransactionList from '@/components/transactions/TransactionList'
import { Colors } from '@/config/theme'
import { SafeAreaView } from 'react-native-safe-area-context'

// Datos de ejemplo - reemplazar con datos reales de la API
const mockTransactions = [
  {
    id: '1',
    type: 'ingreso',
    description: 'Pago por servicios de consultoría',
    category: 'Servicios',
    amount: 750000,
    hasVat: true,
    vatRate: 13,
    date: '2025-08-05',
  },
  {
    id: '2',
    type: 'egreso',
    description: 'Alquiler de oficina',
    category: 'Alquiler',
    amount: 350000,
    hasVat: true,
    vatRate: 13,
    date: '2025-08-04',
  },
  {
    id: '3',
    type: 'ingreso',
    description: 'Desarrollo de software',
    category: 'Servicios',
    amount: 1200000,
    hasVat: true,
    vatRate: 13,
    date: '2025-08-03',
  },
] as const;

export default function Transactions() {
  const handleFilterPress = () => {
    // Implementar lógica de filtrado
  };

  const handleSearchPress = () => {
    // Implementar lógica de búsqueda
  };

  const handleTransactionPress = (transaction: typeof mockTransactions[0]) => {
    // Implementar visualización detallada de la transacción
    console.log('Transaction pressed:', transaction);
  };

  return (
    <SafeAreaView style={styles.container}>
      <TransactionsHeader 
        onFilterPress={handleFilterPress}
        onSearchPress={handleSearchPress}
      />
      <TransactionList 
        transactions={mockTransactions}
        onTransactionPress={handleTransactionPress}
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