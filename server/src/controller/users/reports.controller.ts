import ReportsModel from "../../models/reports.model";
import { User } from "@/types/User";
import { Request, Response } from "express";
import moment from "moment";

export default class ReportsController {
  /**
   * Get IVA report from specific month
   */
  static async iva(req: Request, res: Response) {
    try {
      const { from, to } = req.query;
      const { id } = req.user as User;

      const config = {
        from: moment(String(from)).isValid() ? moment(String(from)) : moment().startOf('month'),
        to: moment(String(to)).isValid() ? moment(String(to)) : moment().endOf('month')
      }

      const report = await ReportsModel.iva(
        id,
        config
      );
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Get income and expenses report from specific month
   */
  static async incomeAndExpenses(req: Request, res: Response) {
    try {
      const { from, to } = req.query;
      const { id } = req.user as User;

      const config = {
        from: moment(String(from)).isValid() ? moment(String(from)) : moment().startOf('month'),
        to: moment(String(to)).isValid() ? moment(String(to)) : moment().endOf('month')
      }



      const report = await ReportsModel.incomeAndExpenses(
        id,
        config
      );
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
