export type Transaction = {
  id: string; // UUID
  userID: string; // UUID
  type: 'ingreso' | 'egreso';
  description?: string;
  category?: string;
  amount: number;
  hasVat: boolean;
  vatRate: number;
  date: string; // ISO date string (YYYY-MM-DD)
  createdAt: string; // ISO date string
};

type NewTransaction = Omit<Transaction, 'id' | 'userID' | 'createdAt'>;

export type TransactionRequestConfig = {
  from: Moment;
  to: Moment;
}