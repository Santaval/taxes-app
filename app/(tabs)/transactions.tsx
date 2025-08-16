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
  const { transactions, error, loading } = useTransactions();
  const [hasError, setHasError] = React.useState(false);

  React.useEffect(() => {
    if (error) {
      setHasError(true);
    }
  }, [error]);

  if (loading) {
    return (
      <ScreenLayout title='Transacciones'>
        <Text>Cargando...</Text>
      </ScreenLayout>
    );
  }

  if (hasError) {
    return (
      <ScreenLayout title='Transacciones'>
        <Text>Error al cargar las transacciones</Text>
      </ScreenLayout>
    );
  }

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
      {transactions && transactions.length > 0 ? (
        <TransactionList transactions={transactions} />
      ) : (
        <Text>No hay transacciones</Text>
      )}
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 8
  },
});
