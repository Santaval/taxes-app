import { Request, Response } from "express";
import TaxProfileModel from "../../models/taxProfile.model";
import { NewTaxProfileSchema, UpdateTaxProfileSchema } from "../../schemas/taxProfile.schema";
import { User } from "@/types/User";

export default class TaxProfileController {
  /**
   * Retrieves the tax profile for the authenticated user.
   * @route GET /tax-profile/my
   * @param req Express request object
   * @param res Express response object
   */
  static async my(req: Request, res: Response) {
    try {
      const { id } = req.user as User;
      const profile = await TaxProfileModel.find("userID", id);
      if (!profile) {
        res.status(404).json({ error: "TaxProfile not found" });
        return;
      }
      res.json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
 

  /**
   * Creates a new tax profile.
   * @route POST /tax-profiles
   * @param req Express request object
   * @param res Express response object
   */
  static async create(req: Request, res: Response) {
    try {
      const { id } = req.user as User;

      const profile = await TaxProfileModel.create({...req.body, userID: id});
      res.status(201).json(profile);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Updates an existing tax profile by ID.
   * @route PUT /tax-profiles/:id
   * @param req Express request object
   * @param res Express response object
   */
  static async update(req: Request, res: Response) {
    try {
      const { id: userID } = req.user as User;
      const profile = await TaxProfileModel.find("userID", userID);
      if (!profile) {
        res.status(404).json({ error: "TaxProfile not found" });
        return;
      }
      const result = await TaxProfileModel.update(profile.id, req.body);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Deletes a tax profile by ID.
   * @route DELETE /tax-profiles/:id
   * @param req Express request object
   * @param res Express response object
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await TaxProfileModel.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
