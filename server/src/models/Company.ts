import CompaniesRepository from "../repository/companies.repository";
import { Company } from "@/types/Company";
import { v4 } from "uuid";

export default class CompanyManagerModel {

  /**
   * Retrieves all company data from the CompaniesRepository.
   * 
   * @returns {Promise<Company[]>} A promise that resolves to an array of company data.
   */
  static async all(): Promise<Company[]> {
    return CompaniesRepository.all();
  }

  /**
   * Finds a company based on the specified field and value.
   *
   * @param fieldToSearch - The field to search by (e.g., 'name', 'id').
   * @param value - The value to search for in the specified field.
   * @returns A promise that resolves to the company data if found, or null if not found.
   */
  static async find(fieldToSearch: string, value: string): Promise<Company | null> {
    return CompaniesRepository.find(fieldToSearch, value);
  }

  /**
   * Creates a new company with the provided name.
   *
   * @param {string} name - The name of the company to be created.
   * @returns {Promise<Company | null>} A promise that resolves to the created company.
   * @throws {Error} Throws an error if a company with the same name already exists.
   */
  static async create(name: string): Promise<Company | null> {
    const existingCompany = await CompaniesRepository.findByName(name);
    if (existingCompany) {
      throw new Error(`Company with name "${name}" already exists`);
    }

    const id = v4();
    await CompaniesRepository.create(id, name);
    return this.find("id", id);
  }

  /**
   * Updates a company with the provided data.
   *
   * @param {string} id - The ID of the company to update.
   * @param {Partial<Company>} data - The data to update.
   * @returns A promise that resolves when the update is complete.
   */
  static async update(id: string, data: Partial<Company>) {
    const fields = Object.keys(data) as (keyof Company)[];
    if (fields.length === 0) {
      throw new Error("No fields to update.");
    }
    const values = Object.values(data);
    return CompaniesRepository.update(fields, values, id);
  }

  /**
   * Deletes a company by its ID.
   *
   * @param {string} id - The ID of the company to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  static async delete(id: string) {
    return CompaniesRepository.delete(id);
  }

  /**
   * Searches for companies by name using a LIKE pattern.
   *
   * @param {string} searchTerm - The search term to look for in company names.
   * @returns {Promise<Company[]>} A promise that resolves to an array of matching companies.
   */
  static async searchByName(searchTerm: string): Promise<Company[]> {
    return CompaniesRepository.searchByName(searchTerm);
  }
}
