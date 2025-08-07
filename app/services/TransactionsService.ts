import { AxiosError } from "axios";
import api from "./api";
import { NewTransaction, Transaction, TransactionRequestConfig } from "@/types/Transaction";

interface ApiErrorResponse {
  message: string;
}

export default class TransactionsService {
  /**
   * Retrieves all transactions.
   * 
   * @returns {Promise<Transaction[]>} A promise that resolves to an array of transactions.
   * @throws {Error} If the request fails.
   */
  static async all(config?: TransactionRequestConfig): Promise<Transaction[]> {
    try {
      const { data } = await api.get<Transaction[]>("/transactions", { params: config });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
    }

  /**
   * Retrieves a transaction by its ID.
   * 
   * @param {string} id - The ID of the transaction to retrieve.
   * @returns {Promise<Transaction>} A promise that resolves to the transaction.
   * @throws {Error} If the request fails.
   */
  static async find(id: string) {
    try {
      const { data } = await api.get<Transaction>(`/transactions/${id}`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }

  /**
   * Creates a new transaction.
   * 
   * @param {NewTransaction} data - The transaction data.
   * @returns {Promise<Transaction>} A promise that resolves to the transaction.
   * @throws {Error} If the request fails.
   */
  static async create(data: NewTransaction) : Promise<Transaction> {
    try {
      const { data: response } = await api.post("/transactions", data);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }

  /**
   * Updates an existing transaction.
   * 
   * @param {string} id - The ID of the transaction to update.
   * @param {Partial<NewTransaction>} data - The transaction data to update.
   * @returns {Promise<Transaction>} A promise that resolves to the updated transaction.
   * @throws {Error} If the request fails.
   */
  static async update(id: string, data: Partial<NewTransaction>) : Promise<Transaction> {
    try {
      const { data: response } = await api.put(`/transactions/${id}`, data);
      return response;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }

  /**
   * Deletes a transaction.
   * 
   * @param {string} id - The ID of the transaction to delete.
   * @returns {Promise<void>} A promise that resolves when the transaction is deleted.
   * @throws {Error} If the request fails.
   */
  static async delete(id: string): Promise<void> {
    try {
      await api.delete(`/transactions/${id}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }
}