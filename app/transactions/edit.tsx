import { View, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Colors } from '@/config/theme';
import TransactionForm from '@/components/transactions/TransactionForm';
import type { Transaction } from '@/types/Transaction';
import { useTransactions } from '@/contexts/TransactionsContext';
import ScreenLayout from '@/components/ui/ScreenLayout';
import React, { useEffect, useState } from 'react';
import TransactionsService from '@/services/TransactionsService';

export default function EditTransactionScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { updateTransaction } = useTransactions();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const formRef = React.useRef<{ handleSubmit: () => void }>(null);

  useEffect(() => {
    const fetchTransaction = async () => {
      const transaction = await TransactionsService.find(id as string);
      setTransaction(transaction);
    };
    fetchTransaction();
  }, [id]);

  const handleCancel = () => {
    router.back();
  };

  const handleSave = async (data: Partial<Transaction>) => {
    try {
      await updateTransaction(id as string, data);
      router.push('/(tabs)/transactions');
    } catch (error) {
      console.error('Error al actualizar la transacción:', error);
    }
  };

  if (!transaction) {
    return null;
  }

  return (
    <ScreenLayout title='Editar Transacción'>
      <View style={styles.container}>
        <TransactionForm
          ref={formRef}
          onSave={handleSave}
          onCancel={handleCancel}
          initialValues={transaction}
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
});
