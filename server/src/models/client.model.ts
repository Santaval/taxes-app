import ClientRepository from "../repository/client.repository";
import Client from "../types/Client";
import { v4 as uuidv4 } from "uuid";

export default class ClientModel {
  /**
   * Retrieves all clients
   */
  static async all(): Promise<Client[]> {
    return ClientRepository.all();
  }

  /**
   * Finds a client by field and value
   */
  static async find(fieldToSearch: string, value: string): Promise<Client | null> {
    return ClientRepository.find(fieldToSearch, value);
  }

  static async findAll(fieldToSearch: string, value: string): Promise<Client[]> {
    return ClientRepository.findAll(fieldToSearch, value);
  }

  /**
   * Creates a new client
   */
  static async create(clientData: Omit<Client, 'id' | 'createdAt'>): Promise<Client | null> {
    const id = uuidv4();
    const client = {
      ...clientData,
      id,
      createdAt: new Date().toISOString()
    };
    await ClientRepository.create(client);
    return this.find("id", id);
  }

  /**
   * Updates a client by id
   */
  static async update(id: string, data: Partial<Client>): Promise<Client | null> {
    const fields = Object.keys(data);
    if (fields.length === 0) throw new Error("No fields to update.");
    const values = Object.values(data);
    await ClientRepository.update(fields, values, id);
    return this.find("id", id);
  }

  /**
   * Deletes a client by id
   */
  static async delete(id: string): Promise<void> {
    return ClientRepository.delete(id);
  }
}
