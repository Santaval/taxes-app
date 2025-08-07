import { Request, Response } from "express";
import TransactionModel from "../../models/transaction.model";
import { NewTransactionSchema, UpdateTransactionSchema } from "../../schemas/transaction.schema";
import { User } from "@/types/User";
import moment from "moment";

export default class TransactionController {
  /**
   * Retrieves all transactions with optional filters
   * @route GET /transactions
   * @query month - Optional month filter (1-12)
   * @query year - Optional year filter
   * @query type - Optional transaction type filter ('ingreso' | 'egreso')
   */
  static async all(req: Request, res: Response) {
    try {
      const { month, year, type } = req.query;
      const transactions = await TransactionModel.all(
        month ? parseInt(month as string) : undefined,
        year ? parseInt(year as string) : undefined,
        type as 'ingreso' | 'egreso' | undefined
      );
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Retrieves all transactions for a specific user
   * @route GET /transactions/user/:userID
   */
  static async allByUser(req: Request, res: Response) {
    try {
      const { id } = req.user as User;
      const { from, to } = req.query;
      
      const config = {
        from: moment(String(from)).isValid() ? moment(String(from)) : moment().startOf('month'),
        to: moment(String(to)).isValid() ? moment(String(to)) : moment().endOf('month')
      }

      const transactions = await TransactionModel.allByUser(id, config);
      res.json(transactions);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Finds a transaction by ID
   * @route GET /transactions/:id
   */
  static async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const transaction = await TransactionModel.find("id", id);
      if (!transaction) {
        res.status(404).json({ error: "Transaction not found" });
        return;
      }
      res.json(transaction);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Creates a new transaction
   * @route POST /transactions
   */
  static async create(req: Request, res: Response) {
    try {
      const { id } = req.user as User
      const transaction = await TransactionModel.create({
        ...req.body,
        userID: id
      });
      res.status(201).json(transaction);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Updates an existing transaction
   * @route PUT /transactions/:id
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id: userID } = req.user as User;
      const result = await TransactionModel.update(id, {
        ...req.body,
        userID 
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Deletes a transaction
   * @route DELETE /transactions/:id
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await TransactionModel.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
