import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { router } from 'expo-router';
import { showToast } from '@/utils/toast';
import TransactionsService from '@/services/TransactionsService';
import { NewTransaction, Transaction } from '@/types/Transaction';
import { useAuth } from './AuthContext';

interface TransactionsContextData {
  transactions: Transaction[];
  loading: boolean;
  error: string | null;
  createTransaction: (data: NewTransaction) => Promise<void>;
  updateTransaction: (id: string, data: Partial<NewTransaction>) => Promise<void>;
  refreshTransactions: () => Promise<void>;
  expenses: Transaction[];
  incomes: Transaction[];
}

const TransactionsContext = createContext<TransactionsContextData | undefined>(undefined);

export function TransactionsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const expenses = transactions.filter(t => t.type === 'egreso');
  const incomes = transactions.filter(t => t.type === 'ingreso');

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

  const createTransaction = async (data: NewTransaction) => {
    try {
      const transaction = await TransactionsService.create(data);
      setTransactions([transaction, ...transactions]);
      router.back();
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : "Error al retirar dinero");
      setError(error as string);
    }
  };

  const updateTransaction = async (id: string, data: Partial<NewTransaction>) => {
    try {
      const updatedTransaction = await TransactionsService.update(id, data);
      setTransactions(transactions.map(t => 
        t.id === id ? updatedTransaction : t
      ));
      router.back();
    } catch (error) {
      showToast.error(error instanceof Error ? error.message : "Error al actualizar la transacción");
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
        createTransaction,
        updateTransaction,
        refreshTransactions: fetchTransactions,
        expenses,
        incomes
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