import { Request, Response } from "express";
import ClientModel from "../../models/client.model";
import { User } from "@/types/User";

export default class ClientController {
  /**
   * Retrieves all clients for a specific user
   */
  static async all(req: Request, res: Response) {
    try {
      const { id } = req.user as User;
      const clients = await ClientModel.findAll("userID", id);
      res.json(clients);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Finds a client by ID
   */
  static async find(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const client = await ClientModel.find("id", id);
      if (!client) {
        res.status(404).json({ error: "Client not found" });
        return;
      }
      res.json(client);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Creates a new client
   */
  static async create(req: Request, res: Response) {
    try {
      const { id } = req.user as User;
      const client = await ClientModel.create({
        ...req.body,
        userID: id
      });
      res.status(201).json(client);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Updates an existing client
   */
  static async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id: userID } = req.user as User;
      
      // Check if client exists and belongs to user
      const existingClient = await ClientModel.find("id", id);
      if (!existingClient) {
        res.status(404).json({ error: "Client not found" });
        return;
      }
      if (existingClient.userID !== userID) {
        res.status(403).json({ error: "Not authorized to update this client" });
        return;
      }

      const result = await ClientModel.update(id, {
        ...req.body,
        userID // Ensure userID cannot be changed
      });
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }

  /**
   * Deletes a client
   */
  static async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { id: userID } = req.user as User;

      // Check if client exists and belongs to user
      const existingClient = await ClientModel.find("id", id);
      if (!existingClient) {
        res.status(404).json({ error: "Client not found" });
        return;
      }
      if (existingClient.userID !== userID) {
        res.status(403).json({ error: "Not authorized to delete this client" });
        return;
      }

      await ClientModel.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: (error as Error).message });
    }
  }
}
