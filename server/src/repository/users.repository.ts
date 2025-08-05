import { NewUser, User, UserFields } from "../types/User";
import BaseRepository from "./base.repository";

export default class UsersRepository extends BaseRepository {
  static TABLE = "users";
  /**
   * Retrieves all users from the database.
   *
   * @returns {Promise<User[]>} A promise that resolves to an array of User objects.
   */
  static async all(): Promise<User[]> {
    return this.select("*", this.TABLE);
  }
  /**
   * Finds a user in the database based on the specified field and value.
   *
   * @param fieldToSearch - The field to search for the user (e.g., "email", "username").
   * @param value - The value to search for in the specified field.
   * @returns A promise that resolves to the found user or null if no user is found.
   */
  static async find(fieldToSearch: string, value: string) : Promise<User | null> {
    return super.find(this.TABLE, fieldToSearch, value);
  }
  /**
   * Creates a new user in the repository.
   *
   * @param {NewUser} newUser - The new user object containing user details.
   * @returns {Promise<any>} A promise that resolves when the user is successfully created.
   */
  static async create(email: string, id: string, password?: string): Promise<any> {
    const fields = ["email", "id", "password"];
    const values = [email, id, password];
    return this.insert(fields, values, this.TABLE);
  }
  /**
   * Updates the user record in the database with the specified fields and values.
   *
   * @param {UserFields[]} fields - An array of fields to be updated.
   * @param {any[]} values - An array of values corresponding to the fields to be updated.
   * @param {string} userID - The ID of the user to be updated.
   * @returns {Promise<any>} A promise that resolves to the result of the update operation.
   */
  static async update(fields: UserFields[], values: any[], userID: string) {
    return super.update(fields, values, userID, this.TABLE);
  }
  /**
   * Deletes a user from the repository.
   *
   * @param userID - The unique identifier of the user to be deleted.
   * @returns A promise that resolves when the user has been deleted.
   */
  static async delete(userID: string) {
    return super.delete(this.TABLE, userID);
  }

}

