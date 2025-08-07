import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Colors, Spacing } from '@/config/theme';
import TransactionForm from '@/components/transactions/TransactionForm';
import type { Transaction } from '@/types/Transaction';
import { useTransactions } from '@/contexts/TransactionsContext';
import ScreenLayout from '@/components/ui/ScreenLayout';
import { useRouter } from 'expo-router';
import { showInterstitialAd } from '@/components/Ads';

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
      await showInterstitialAd(); // Show ad after transaction is saved
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
