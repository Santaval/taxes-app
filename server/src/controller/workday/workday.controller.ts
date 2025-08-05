import { Request, Response } from "express";
import WorkdayManagerModel from "../../models/Workday";
import { User } from "@/types/User";

export default class WorkdayController {
  /**
   * Retrieves all workdays from the database.
   * @param req - The request object.
   * @param res - The response object to send the result.
   */
  static async all(req: Request, res: Response) {
    try {
      const workdays = await WorkdayManagerModel.all();
      res.json(workdays);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieves a specific workday by its ID.
   * @param req - The request object containing the workday ID in params.
   * @param res - The response object to send the result.
   */
  static async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const workday = await WorkdayManagerModel.find("id", id);
      if (!workday) {
        res.status(404).json({ error: "Workday not found" });
        return;
      }
      res.json(workday);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Creates a new workday.
   * @param req - The request object containing workday data in the body.
   * @param res - The response object to send the result.
   */
  static async create(req: Request, res: Response) {
    try {
      const data = req.body;
      // You may want to validate required fields here
      const { id  } = req.user as User; // Assuming the user ID is available in the request
      const workday = await WorkdayManagerModel.create({
        ...data,
        employeeID: id,
      });
      res.status(201).json(workday);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Updates an existing workday.
   * @param req - The request object containing the workday ID in params and update data in body.
   * @param res - The response object to send the result.
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;
      const existingWorkday = await WorkdayManagerModel.find("id", id);
      if (!existingWorkday) {
        return res.status(404).json({ error: "Workday not found" });
      }
      await WorkdayManagerModel.update(id, updateData);
      const updatedWorkday = await WorkdayManagerModel.find("id", id);
      res.json(updatedWorkday);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Deletes a workday by its ID.
   * @param req - The request object containing the workday ID in params.
   * @param res - The response object to send the result.
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const existingWorkday = await WorkdayManagerModel.find("id", id);
      if (!existingWorkday) {
        return res.status(404).json({ error: "Workday not found" });
      }
      await WorkdayManagerModel.delete(id);
      res.json({ message: "Workday deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieves all workdays for a specific employee.
   * @param req - The request object containing the employee ID in params.
   * @param res - The response object to send the result.
   */
  static async getByEmployeeId(req: Request, res: Response) {
    try {
      const { employeeId } = req.params;
      const workdays = await WorkdayManagerModel.findByEmployeeId(employeeId);
      res.json(workdays);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
