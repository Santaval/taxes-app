import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import { showToast } from '@/utils/toast';
import TransactionsService from '@/services/TransactionsService';
import { Transaction } from '@/types/Transaction';
import { useAuth } from './AuthContext';

interface TransactionsContextData {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  requestWithdrawal: (amount: number) => Promise<void>;
  refreshTransactions: () => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const transactions = await TransactionsService.all();
      setTransactions(transactions);
      setError(null);
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : "Error al obtener transacciones");
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const requestWithdrawal = async (amount: number) => {
    try {
      const transaction = await TransactionsService.withdraw(amount);
      setTransactions([transaction, ...transactions]);
      router.back();
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : "Error al retirar dinero");
      setError(error as string);
    }
  };

  useEffect(() => {
    if (user) { 
      fetchTransactions();
    }
  }, [user]);

  return (
    <TransactionsContext.Provider 
      value={{ 
        transactions, 
        loading, 
        error, 
        requestWithdrawal,
        refreshTransactions: fetchTransactions
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
}

export function useTransactions() {
  const context = useContext(TransactionsContext);
  if (context === undefined) {
    throw new Error('useTransactions must be used within a TransactionsProvider');
  }
  return context;
} 