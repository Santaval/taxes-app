import { TaxProfile } from "../types/TaxProfile";
import BaseRepository from "./base.repository";

export default class TaxProfileRepository extends BaseRepository {
  static TABLE = "taxProfiles";

  /**
   * Retrieves all tax profiles from the database.
   * @returns {Promise<TaxProfile[]>}
   */
  static async all(): Promise<TaxProfile[]> {
    return this.select("*", this.TABLE);
  }

  /**
   * Finds a tax profile by a specific field and value.
   * @param fieldToSearch - The field to search for (e.g., "id", "userID")
   * @param value - The value to search for
   * @returns {Promise<TaxProfile | null>}
   */
  static async find(fieldToSearch: string, value: string): Promise<TaxProfile | null> {
    return super.find(this.TABLE, fieldToSearch, value);
  }

  /**
   * Creates a new tax profile.
   * @param {TaxProfile} profile - The tax profile object
   * @returns {Promise<any>}
   */
  static async create(profile: TaxProfile): Promise<any> {
    const fields = Object.keys(profile);
    const values = Object.values(profile);
    return this.insert(fields, values, this.TABLE);
  }

  /**
   * Updates a tax profile.
   * @param {string[]} fields - Fields to update
   * @param {any[]} values - Values to update
   * @param {string} id - TaxProfile id
   * @returns {Promise<any>}
   */
  static async update(fields: string[], values: any[], id: string): Promise<any> {
    return super.update(fields, values, id, this.TABLE);
  }

  /**
   * Deletes a tax profile by id.
   * @param {string} id - TaxProfile id
   * @returns {Promise<any>}
   */
  static async delete(id: string): Promise<any> {
    return super.delete(this.TABLE, id);
  }
}
