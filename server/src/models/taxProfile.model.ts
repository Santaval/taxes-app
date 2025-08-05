import TaxProfileRepository from "../repository/taxProfile.repository";
import { TaxProfile } from "@/types/TaxProfile";
import { v4 as uuidv4 } from "uuid";

export default class TaxProfileModel {
  /**
   * Retrieves all tax profiles.
   * @returns {Promise<TaxProfile[]>}
   */
  static async all(): Promise<TaxProfile[]> {
    return TaxProfileRepository.all();
  }

  /**
   * Finds a tax profile by field and value.
   * @param fieldToSearch - The field to search by (e.g., 'id', 'userID')
   * @param value - The value to search for
   * @returns {Promise<TaxProfile | null>}
   */
  static async find(fieldToSearch: string, value: string): Promise<TaxProfile | null> {
    return TaxProfileRepository.find(fieldToSearch, value);
  }

  /**
   * Creates a new tax profile.
   * @param {Omit<TaxProfile, 'id' | 'createdAt'>} profileData - Data for the new tax profile
   * @returns {Promise<TaxProfile | null>}
   */
  static async create(profileData: Omit<TaxProfile, 'id'>): Promise<TaxProfile | null> {
    // check if user already have a profile created
    const existingProfile = await this.find("userID", profileData.userID);
    if (existingProfile) throw new Error("Tax profile already exists for this user.");
   
    const id = uuidv4();
    const profile: TaxProfile = { ...profileData, id };
    await TaxProfileRepository.create(profile);
    return this.find("id", id);
  }

  /**
   * Updates a tax profile by id.
   * @param id - TaxProfile id
   * @param data - Partial data to update
   * @returns {Promise<any>}
   */
  static async update(id: string, data: Partial<TaxProfile>): Promise<TaxProfile | null> {
    const fields = Object.keys(data);
    if (fields.length === 0) throw new Error("No fields to update.");
    const values = Object.values(data);
    await TaxProfileRepository.update(fields, values, id);
    return this.find("id", id);
  }

  /**
   * Deletes a tax profile by id.
   * @param id - TaxProfile id
   * @returns {Promise<any>}
   */
  static async delete(id: string): Promise<any> {
    return TaxProfileRepository.delete(id);
  }
}
