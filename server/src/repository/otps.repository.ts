import { OTPFields } from "@/types/OTP";
import BaseRepository from "./base.repository";

export default class OtpsRepository extends BaseRepository {
  static TABLE = "otps";
  /**
   * Retrieves all otps from the database.
   *
   */
  static async create(fields: OTPFields[], values: any[])  {
    await super.insert(fields, values, this.TABLE);
  }

  /**
   * Finds a record in the specified table based on the given field and value.
   *
   * @param fieldToSearch - The field to search for in the table.
   * @param value - The value to match in the specified field.
   * @returns A promise that resolves to the found record(s).
   */
  static async find(fieldToSearch: string, value: string) {
    return super.find(this.TABLE, fieldToSearch, value);
  }

  /**
   * Deletes an OTP entry from the database.
   *
   * @param otpID - The unique identifier of the OTP to be deleted.
   * @returns A promise that resolves when the OTP entry is deleted.
   */
  static async delete(otpID: string) {
    return super.delete(this.TABLE, otpID);
  }
}