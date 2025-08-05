import WorkdayRepository from "../repository/workday.repository";
import { Workday, NewWorkday } from "@/types/Workday";
import moment from "moment";
import { v4 } from "uuid";

export default class WorkdayManagerModel {
  /**
   * Retrieves all workday records from the WorkdayRepository.
   * @returns {Promise<Workday[]>} A promise that resolves to an array of workday records.
   */
  static async all(): Promise<{workdays: Workday[], hoursWorked: number}> {
    const workdays = await WorkdayRepository.all();
    const hoursworked = workdays.reduce((total, workday) => total + workday.hoursWorked, 0);
    return { workdays, hoursWorked: hoursworked };
  }

  /**
   * Finds a workday record by a specific field and value.
   * @param fieldToSearch - The field to search by (e.g., 'id', 'employeeId').
   * @param value - The value to search for in the specified field.
   * @returns {Promise<Workday | null>} A promise that resolves to the workday record if found, or null.
   */
  static async find(fieldToSearch: string, value: string): Promise<Workday | null> {
    return WorkdayRepository.find(fieldToSearch, value);
  }

  /**
   * Creates a new workday record.
   * @param {NewWorkday} data - The data for the new workday record.
   * @returns {Promise<Workday | null>} A promise that resolves to the created workday record.
   */
  static async create(data: NewWorkday): Promise<Workday | null> {
    const id = v4();
    await WorkdayRepository.create({ ...data, id, date: moment(data.date).format("YYYY-MM-DD") });
    return this.find("id", id);
  }

  /**
   * Updates a workday record with the provided data.
   * @param {string} id - The ID of the workday to update.
   * @param {Partial<Workday>} data - The data to update.
   * @returns A promise that resolves when the update is complete.
   */
  static async update(id: string, data: Partial<Workday>) {
    const fields = Object.keys(data) as (keyof Workday)[];
    if (fields.length === 0) {
      throw new Error("No fields to update.");
    }
    const values = Object.values(data);
    return WorkdayRepository.update(fields, values, id);
  }

  /**
   * Deletes a workday record by its ID.
   * @param {string} id - The ID of the workday to delete.
   * @returns A promise that resolves when the deletion is complete.
   */
  static async delete(id: string) {
    return WorkdayRepository.delete(id);
  }

  /**
   * Retrieves all workday records for a specific employee.
   * @param employeeId - The ID of the employee.
   * @returns {Promise<Workday[]>} A promise that resolves to an array of workday records for the employee.
   */
  static async findByEmployeeId(employeeId: string): Promise<Workday[]> {
    return WorkdayRepository.findByEmployeeId(employeeId);
  }
}
