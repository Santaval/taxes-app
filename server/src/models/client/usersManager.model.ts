import UsersRepository from "../../repository/users.repository";
import { NewUser, NewUserFields, User } from "../../types/User";
import { v4 } from "uuid";
import bcrypt from "bcryptjs";

export default class UserManagerModel {

  /**
   * Retrieves all user data from the UsersRepository.
   * 
   * @returns {Promise<any[]>} A promise that resolves to an array of user data.
   */
  static async all() {
    return UsersRepository.all();
  }
  /**
   * Finds a user based on the specified field and value.
   *
   * @param fieldToSearch - The field to search by (e.g., 'email', 'username').
   * @param value - The value to search for in the specified field.
   * @returns A promise that resolves to the user data if found, or null if not found.
   */
  static async find(fieldToSearch: string, value: string) {
    return UsersRepository.find(fieldToSearch, value);
  }

  /**
   * Creates a new user with the provided user data.
   *
   * @param {NewUser} userData - The data for the new user to be created.
   * @returns {Promise<User>} A promise that resolves to the created user.
   */
  static async create(email: string, password?: string): Promise<User | null> {
    const id = v4();
    const hashedPassword = password ? await UserManagerModel.hashPassword(password) : undefined;
    await UsersRepository.create(email, id, hashedPassword);
    return this.find("id", id);
  }

  static async update(id: string, data: Partial<NewUser>) {
    const fields: NewUserFields[] = Object.keys(data) as NewUserFields[];
    if (fields.length === 0) {
      throw new Error("No fields to update.");
    }
    const values = Object.values(data);
    return UsersRepository.update(fields, values, id);
  }

  /** 
   * Hashes the user's password.
   */
  static async hashPassword(password: string): Promise<string> {
    // Implement password hashing logic here, e.g., using bcrypt
    return bcrypt.hash(password, 10);
  }

}