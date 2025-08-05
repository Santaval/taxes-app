import TransactionRepository from "../repository/transactions.repository";
import { Transaction } from "../types/Transaction";
import { v4 as uuidv4 } from "uuid";

export default class TransactionModel {
  /**
   * Retrieves all transactions with optional filters
   */
  static async all(month?: number, year?: number, type?: 'ingreso' | 'egreso'): Promise<Transaction[]> {
    return TransactionRepository.all(month, year, type);
  }

  /**
   * Finds a transaction by field and value
   */
  static async find(fieldToSearch: string, value: string): Promise<Transaction | null> {
    return TransactionRepository.find(fieldToSearch, value);
  }

  /**
   * Creates a new transaction
   */
  static async create(transactionData: Omit<Transaction, 'id' | 'createdAt'>): Promise<Transaction | null> {
    const id = uuidv4();
    const transaction = {
      ...transactionData,
      id,
    };
    await TransactionRepository.create(transaction);
    return this.find("id", id);
  }

  /**
   * Updates a transaction by id
   */
  static async update(id: string, data: Partial<Transaction>): Promise<Transaction | null> {
    const fields = Object.keys(data);
    if (fields.length === 0) throw new Error("No fields to update.");
    const values = Object.values(data);
    await TransactionRepository.update(fields, values, id);
    return this.find("id", id);
  }

  /**
   * Deletes a transaction by id
   */
  static async delete(id: string): Promise<any> {
    return TransactionRepository.delete(id);
  }
}
