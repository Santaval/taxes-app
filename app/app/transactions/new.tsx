import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Spacing } from '@/config/theme';
import TransactionForm from '@/components/transactions/TransactionForm';
import type { Transaction } from '@/types/Transaction';
import { useTransactions } from '@/contexts/TransactionsContext';
import ScreenLayout from '@/components/ui/ScreenLayout';

export default function NewTransactionScreen() {
  const router = useRouter();
  const { createTransaction  } = useTransactions()
  const formRef = React.useRef<{ handleSubmit: () => void }>(null);

  const handleCancel = () => {
    router.back();
  };

  const handleSave = async (transaction: Omit<Transaction, 'id' | 'userID' | 'createdAt'>) => {
    try {
      await createTransaction(transaction);
      router.push('/(tabs)/transactions'); // Redirect to transactions list
    } catch (error) {
      // Manejar el error
      console.error('Error al guardar la transacción:', error);
    }
  };

  return (
    <ScreenLayout
        title='Nueva Transacción'
    >
        <View style={styles.container}>
      <TransactionForm 
        ref={formRef}
        onSave={handleSave} 
        onCancel={handleCancel} 
      />
    </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.componentBg,
  },
  headerButton: {
    padding: Spacing.sm,
  },
});
