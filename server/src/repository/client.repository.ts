import Client from "../types/Client";
import BaseRepository from "./base.repository";

export default class ClientRepository extends BaseRepository {
  private static tableName = "clients";

  /**
   * Retrieves all clients from the database.
   * @returns Client[]
   */
  static async all(): Promise<Client[]> {
    return super.select("*", this.tableName);
  }

  /**
   * Finds a client by field and value.
   * @param fieldToSearch 
   * @param value 
   * @returns Client or null
   */
  static async find(fieldToSearch: string, value: string): Promise<Client | null> {
    const result = await super.find(this.tableName, fieldToSearch, value);
    return result.length > 0 ? result[0] : null;
  }

  /**
   * Finds a client by field and value.
   * @param fieldToSearch 
   * @param value 
   * @returns Client[]
   */
  static async findAll(fieldToSearch: string, value: string): Promise<Client[]> {
    return super.findAll(this.tableName, fieldToSearch, value);
  }

  /**
   * Creates a new client in the repository.
   * @param client 
   */
  static async create(client: Client): Promise<void> {
    const fields = Object.keys(client);
    const values = Object.values(client);
    await super.insert(fields, values, this.tableName);
  }

  /**
   * Updates an existing client in the repository.
   * @param fields 
   * @param values 
   * @param id 
   */
  static async update(fields: string[], values: any[], id: string): Promise<void> {
    await super.update(fields, values, id, this.tableName)
  }

  /**
   * Deletes a client by id.
   * @param id 
   */
  static async delete(id: string): Promise<void> {
    await super.delete(this.tableName, id);
  }
}
