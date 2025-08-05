import UserManagerModel from "../../models/client/usersManager.model";
import { NewUser, User } from "@/types/User";
import { Request, Response } from "express";
import cloudinary from "../../config/cloudinary";

export default class ProfileController {
/**
 * Updates the user profile with the provided information.
 * 
 * @param req - The request object containing user and body data.
 * @param res - The response object to send the result.
 * 
 * @throws Will throw an error if the user is not found.
 * 
 * The request body should contain the following fields:
 * - `name`: The new name of the user.
 * - `firstSurname`: The new first surname of the user.
 * - `secondSurname`: The new second surname of the user.
 * - `birthdate`: The new birthdate of the user.
 * - `phoneNumber`: The new phone number of the user.
 * 
 * The response will contain a success message if the update is successful.
 * If an error occurs, the response will contain an error message with a status code of 401.
 */
  static async update(req: Request, res: Response) {
    try {
      const user = req.user as User;
      if (!user) throw new Error("User not found.");
      const { name } =
        req.body;
      const newUser: NewUser = {
        name,
      };

      await UserManagerModel.update(user.id, newUser);
      const updatedUser = await UserManagerModel.find("id", user.id);
      res.json(updatedUser);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  }

}
