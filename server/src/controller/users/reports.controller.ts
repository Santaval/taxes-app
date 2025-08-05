import ReportsModel from "../../models/reports.model";
import { User } from "@/types/User";
import { Request, Response } from "express";

export default class ReportsController {

  /**
   * Get IVA report from specific month
   * 
  */
 static async iva(req:Request, res: Response) {
    try {
      const { month, year } = req.query;
      const { id } = req.user as User;

      if (!month || !year) {
        res.status(400).json({ error: "Month and year are required" });
        return;
      }

      const report = await ReportsModel.iva(id, parseInt(month as string), parseInt(year as string));
      res.json(report);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

}
