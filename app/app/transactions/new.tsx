import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import { Colors, Spacing } from '@/config/theme';
import TransactionForm from '@/components/transactions/TransactionForm';
import type { Transaction } from '@/types/Transaction';
import { useTransactions } from '@/contexts/TransactionsContext';

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
      router.back();
    } catch (error) {
      // Manejar el error
      console.error('Error al guardar la transacción:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Nueva transacción',
          headerLeft: () => (
            <TouchableOpacity onPress={handleCancel} style={styles.headerButton}>
              <FontAwesome5 name="times" size={20} color={Colors.text} />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity 
              onPress={() => formRef.current?.handleSubmit()} 
              style={styles.headerButton}
            >
              <FontAwesome5 name="check" size={20} color={Colors.primary} />
            </TouchableOpacity>
          ),
        }}
      />
      <TransactionForm 
        ref={formRef}
        onSave={handleSave} 
        onCancel={handleCancel} 
      />
    </View>
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
