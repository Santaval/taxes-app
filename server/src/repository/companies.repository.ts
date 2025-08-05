import { Company, CompanyFields } from "@/types/Company";
import BaseRepository from "./base.repository";

export default class CompaniesRepository extends BaseRepository {
  static TABLE = "companies";

  /**
   * Retrieves all companies from the database.
   *
   * @returns {Promise<Company[]>} A promise that resolves to an array of Company objects.
   */
  static async all(): Promise<Company[]> {
    return this.select("*", this.TABLE);
  }

  /**
   * Finds a company in the database based on the specified field and value.
   *
   * @param fieldToSearch - The field to search for the company (e.g., "name", "id").
   * @param value - The value to search for in the specified field.
   * @returns A promise that resolves to the found company or null if no company is found.
   */
  static async find(fieldToSearch: string, value: string): Promise<Company | null> {
    return super.find(this.TABLE, fieldToSearch, value);
  }

  /**
   * Finds a company by its ID.
   *
   * @param id - The unique identifier of the company.
   * @returns A promise that resolves to the found company or null if no company is found.
   */
  static async findById(id: string): Promise<Company | null> {
    return this.find("id", id);
  }

  /**
   * Finds a company by its name.
   *
   * @param name - The name of the company.
   * @returns A promise that resolves to the found company or null if no company is found.
   */
  static async findByName(name: string): Promise<Company | null> {
    return this.find("name", name);
  }

  /**
   * Creates a new company in the repository.
   *
   * @param {string} id - The unique identifier for the company.
   * @param {string} name - The name of the company.
   * @returns {Promise<any>} A promise that resolves when the company is successfully created.
   */
  static async create(id: string, name: string): Promise<any> {
    const fields = ["id", "name"];
    const values = [id, name];
    return this.insert(fields, values, this.TABLE);
  }

  /**
   * Updates the company record in the database with the specified fields and values.
   *
   * @param {CompanyFields[]} fields - An array of fields to be updated.
   * @param {any[]} values - An array of values corresponding to the fields to be updated.
   * @param {string} companyID - The ID of the company to be updated.
   * @returns {Promise<any>} A promise that resolves to the result of the update operation.
   */
  static async update(fields: CompanyFields[], values: any[], companyID: string): Promise<any> {
    return super.update(fields, values, companyID, this.TABLE);
  }

  /**
   * Updates a company's name.
   *
   * @param {string} companyID - The ID of the company to be updated.
   * @param {string} name - The new name for the company.
   * @returns {Promise<any>} A promise that resolves to the result of the update operation.
   */
  static async updateName(companyID: string, name: string): Promise<any> {
    return this.update(["name"], [name], companyID);
  }

  /**
   * Deletes a company from the repository.
   *
   * @param companyID - The unique identifier of the company to be deleted.
   * @returns A promise that resolves when the company has been deleted.
   */
  static async delete(companyID: string): Promise<any> {
    return super.delete(this.TABLE, companyID);
  }

  /**
   * Searches for companies by name using a LIKE pattern.
   *
   * @param {string} searchTerm - The search term to look for in company names.
   * @returns {Promise<Company[]>} A promise that resolves to an array of matching companies.
   */
  static async searchByName(searchTerm: string): Promise<Company[]> {
    const sql = `SELECT * FROM ${this.TABLE} WHERE name LIKE ?`;
    return this.query(sql, [`%${searchTerm}%`]);
  }

  /**
   * Checks if a company with the given name already exists.
   *
   * @param {string} name - The name to check for existence.
   * @returns {Promise<boolean>} A promise that resolves to true if the company exists, false otherwise.
   */
  static async exists(name: string): Promise<boolean> {
    const company = await this.findByName(name);
    return company !== null;
  }
}
