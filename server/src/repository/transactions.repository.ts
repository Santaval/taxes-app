import { Transaction } from "../types/Transaction";
import BaseRepository from "./base.repository";

export default class TransactionRepository extends BaseRepository {
  static TABLE = "transactions";

  /**
   * Retrieves all transactions with optional filters
   * @param {number} month - Optional month filter (1-12)
   * @param {number} year - Optional year filter
   * @param {string} type - Optional transaction type filter ('ingreso' | 'egreso')
   * @returns {Promise<Transaction[]>}
   */
  static async all(month?: number, year?: number, type?: 'ingreso' | 'egreso'): Promise<Transaction[]> {
    let query = `SELECT * FROM ${this.TABLE}`;
    const conditions: string[] = [];
    const values: any[] = [];

    if (month && year) {
      conditions.push("EXTRACT(MONTH FROM date) = ? AND EXTRACT(YEAR FROM date) = ?");
      values.push(month, year);
    }

    if (type) {
      conditions.push("type = ?");
      values.push(type);
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ");
    }

    return this.query(query, values);
  }

  /**
   * Finds a transaction by field and value
   */
  static async find(fieldToSearch: string, value: string): Promise<Transaction | null> {
    return super.find(this.TABLE, fieldToSearch, value);
  }

  static async findAll(fieldToSearch: string, value: string): Promise<Transaction[]> {
    return super.findAll(this.TABLE, fieldToSearch, value);
  }

  /**
   * Creates a new transaction
   */
  static async create(transaction: Omit<Transaction, 'id' | 'createdAt'>): Promise<any> {
    const fields = Object.keys(transaction);
    const values = Object.values(transaction);
    return this.insert(fields, values, this.TABLE);
  }

  /**
   * Updates a transaction
   */
  static async update(fields: string[], values: any[], id: string): Promise<any> {
    return super.update(fields, values, id, this.TABLE);
  }

  /**
   * Deletes a transaction
   */
  static async delete(id: string): Promise<any> {
    return super.delete(this.TABLE, id);
  }
}
