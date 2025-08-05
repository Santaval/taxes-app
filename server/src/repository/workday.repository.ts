import { Company, CompanyFields } from "@/types/Company";
import BaseRepository from "./base.repository";
import { NewWorkday, Workday, WorkdayFields } from "@/types/Workday";

export default class CompaniesRepository extends BaseRepository {
  static TABLE = "workday";

  /**
   * Retrieves all workdays register from the database.
   *
   * @returns {Promise<Company[]>} A promise that resolves to an array of Company objects.
   */
  static async all(): Promise<Workday[]> {
    return this.select("*", this.TABLE);
  }

  /**
   * Finds a workday register in the database based on the specified field and value.
   *
   * @param fieldToSearch - The field to search for the workday (e.g., "id").
   * @param value - The value to search for in the specified field.
   * @returns A promise that resolves to the found workday register or null if no workday register is found.
   */
  static async find(fieldToSearch: string, value: string): Promise<Workday | null> {
    return super.find(this.TABLE, fieldToSearch, value);
  }


  /**
   * Creates a new workday register in the repository.
   *
   * @param {string} id - The unique identifier for the workday register.
   * @param {string} name - The name of the workday register.
   * @returns {Promise<any>} A promise that resolves when the workday register is successfully created.
   */
  static async create(data: NewWorkday): Promise<any> {
    const fields = Object.keys(data) as (keyof NewWorkday)[];
    const values = Object.values(data);
    return this.insert(fields, values, this.TABLE);
  }

  /**
   * Updates the workday record in the database with the specified fields and values.
   *
   * @param {WorkdayFields[]} fields - An array of fields to be updated.
   * @param {any[]} values - An array of values corresponding to the fields to be updated.
   * @param {string} companyID - The ID of the workday to be updated.
   * @returns {Promise<any>} A promise that resolves to the result of the update operation.
   */
  static async update(fields: WorkdayFields[], values: any[], workdayID: string): Promise<any> {
    return super.update(fields, values, workdayID, this.TABLE);
  }



  /**
   * Deletes a workday from the repository.
   *
   * @param workdayID - The unique identifier of the workday to be deleted.
   * @returns A promise that resolves when the company has been deleted.
   */
  static async delete(workdayID: string): Promise<any> {
    return super.delete(this.TABLE, workdayID);
  }

  /**
   * Retrieves all workdays for a specific employee.
   * @param employeeId - The ID of the employee.
   * @returns {Promise<Workday[]>} A promise that resolves to an array of workdays for the employee.
   */
  static async findByEmployeeId(employeeId: string): Promise<Workday[]> {
    const rows = await BaseRepository.query(`SELECT * FROM ${this.TABLE} WHERE employeeId = ?`, [employeeId]);
    return rows;
  }
}
