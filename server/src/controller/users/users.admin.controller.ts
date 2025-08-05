import UserManagerModel from "../../models/client/usersManager.model";
import { Request, Response } from "express";

export default class AdminUsersController {
    /**
     * Retrieves all users from the database.
     * 
     * @param req - The request object.
     * @param res - The response object to send the result.
     * 
     * @throws Will throw an error if the user is not found.
     * 
     * The response will contain a list of all users in JSON format.
     */
    static async all(req: Request, res: Response) {
        try {
        const users = await UserManagerModel.all();
        res.json(users);
        } catch (error: any) {
        res.status(401).json({ error: error.message });
        }
    }

    static async getById(req: Request, res: Response) {
        const { id } = req.params;
        const user = await UserManagerModel.find("id", id);
        res.json(user);
    }
}