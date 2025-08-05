import { Request, Response } from "express";
import CompanyManagerModel from "../../models/Company";

export default class CompaniesController {
  /**
   * Retrieves all companies from the database.
   * 
   * @param req - The request object.
   * @param res - The response object to send the result.
   * 
   * The response will contain a list of all companies in JSON format.
   */
  static async all(req: Request, res: Response) {
    try {
      const companies = await CompanyManagerModel.all();
      res.json(companies);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Retrieves a specific company by its ID.
   * 
   * @param req - The request object containing the company ID in params.
   * @param res - The response object to send the result.
   */
  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const company = await CompanyManagerModel.find("id", id);
      
      if (!company) {
        return res.status(404).json({ error: "Company not found" });
      }
      
      res.json(company);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Creates a new company.
   * 
   * @param req - The request object containing the company name in the body.
   * @param res - The response object to send the result.
   */
  static async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: "Company name is required" });
      }

      const company = await CompanyManagerModel.create(name);
      res.status(201).json(company);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Updates an existing company.
   * 
   * @param req - The request object containing the company ID in params and update data in body.
   * @param res - The response object to send the result.
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      // Check if company exists
      const existingCompany = await CompanyManagerModel.find("id", id);
      if (!existingCompany) {
        return res.status(404).json({ error: "Company not found" });
      }

      await CompanyManagerModel.update(id, updateData);
      
      // Return updated company
      const updatedCompany = await CompanyManagerModel.find("id", id);
      res.json(updatedCompany);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  /**
   * Deletes a company by its ID.
   * 
   * @param req - The request object containing the company ID in params.
   * @param res - The response object to send the result.
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      // Check if company exists
      const existingCompany = await CompanyManagerModel.find("id", id);
      if (!existingCompany) {
        return res.status(404).json({ error: "Company not found" });
      }

      await CompanyManagerModel.delete(id);
      res.json({ message: "Company deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  /**
   * Searches for companies by name.
   * 
   * @param req - The request object containing the search term in query parameters.
   * @param res - The response object to send the result.
   */
  static async search(req: Request, res: Response) {
    try {
      const { q } = req.query;
      
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ error: "Search query is required" });
      }

      const companies = await CompanyManagerModel.searchByName(q);
      res.json(companies);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
