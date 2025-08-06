import { AxiosError } from "axios";
import api from "./api";
import { NewTransaction, Transaction } from "@/types/Transaction";

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
  static async all() {
    try {
      const { data } = await api.get<Transaction[]>("/transactions");
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
}