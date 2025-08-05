import { CookieOptions, Request, Response } from "express";
import UserAuthModel from "../../models/client/userAuth.model";
import { NewUser, User } from "@/types/User";
import UserManagerModel from "../../models/client/usersManager.model";

export default class AuthController {
  /**
   * Handles user signup.
   *
   * @param req - The request object containing user details in the body.
   * @param res - The response object used to send back the HTTP response.
   *
   * @remarks
   * This method extracts user details from the request body, creates a new user object,
   * and attempts to sign up the user using the `UserAuthModel.signup` method. If successful,
   * it sends a 201 status code with a success message. If an error occurs, it logs the error
   * and sends a 401 status code with the error message.
   *
   * @throws Will throw an error if the signup process fails.
   */
  static async signup(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const token = await UserAuthModel.signup(email, password);
      res.status(201).json({ token });
    } catch (error: any) {
      console.error("Error during signup:", error);
      res.status(401).json({ message: error.message });
    }
  }

  /**
   * Handles user login by verifying the provided email and OTP (One-Time Password).
   *
   * @param req - The request object containing the email and OTP in the body.
   * @param res - The response object used to send back the appropriate response.
   * @returns A promise that resolves to the result of the login attempt.
   *
   * @throws Will throw an error if the login attempt fails, responding with a 401 status code and the error message.
   */
  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const { token, user } = await UserAuthModel.login(email, password );
      res.json({ token, user });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  /**
   * Handles admin login by verifying the provided email and OTP (One-Time Password).
   *
   * @param req - The request object containing the email and OTP in the body.
   * @param res - The response object used to send back the appropriate response.
   * @returns A promise that resolves to the result of the login attempt.
   *
   * @throws Will throw an error if the login attempt fails, responding with a 401 status code and the error message.
   */
  static async loginAdmin(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const { token } = await UserAuthModel.loginAdmin(email);
      const cookieConfig =
        process.env.NODE_ENV === "development"
          ? {
              sameSite: "lax",
              maxAge: 1000 * 60 * 60 * 24 * 7,
            }
          : {
              sameSite: "None",
              secure: true,
              domain: "ingeniodentalab.com",
              maxAge: 1000 * 60 * 60 * 24 * 7,
            };
      res.cookie("token", token, cookieConfig as CookieOptions).end();
    } catch (error: any) { 
      res.status(401).json({ message: error.message });
    }
  }

  /**
   * Sends an OTP (One-Time Password) to the user's email address.
   *
   * @param req - The request object containing the user's email in the body.
   * @param res - The response object used to send back the result.
   *
   * @returns A JSON response indicating whether the OTP was sent successfully or an error occurred.
   *
   * @throws Will return a 401 status code with an error message if sending the OTP fails.
   */
  static async sendOtp(req: Request, res: Response) {
    try {
      const { email } = req.body;
      await UserAuthModel.sendOtp(email);
      res.json({ message: "OTP sent successfully." });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  /**
   * Retrieves the authenticated user's information from the request object and sends it as a JSON response.
   *
   * @param req - The request object, which should contain the authenticated user's information.
   * @param res - The response object used to send the JSON response.
   *
   * @returns A JSON response containing the authenticated user's information.
   *
   * @throws Will send a 401 status code with an error message if an error occurs.
   */
  static async getUser(req: Request, res: Response) {
    try {
      if (!req.user) throw new Error("User not found.");
      const { id } = req.user as User;
      const user = await UserManagerModel.find("id", id);
      res.json(user);
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  static async complete(req: Request, res: Response) {
    try {
      const user = req.user as User;
      if (!user) throw new Error("User not found.");
      const { name } =
        req.body;
      const newUser: NewUser = {
        name,
        completedProfile: true,
      };

      await UserAuthModel.complete(user.id, newUser);
      res.json({ message: "User profile updated successfully." });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  /**
   * Handles Google authentication.
   *
   * @param req - The request object containing the Google OAuth token in the body.
   * @param res - The response object used to send back the result.
   *
   * @returns A JSON response containing the JWT token and user information.
   */
  static async google(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const { jwtToken, user } = await UserAuthModel.google(token);
      res.json({ token: jwtToken, user });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  /**
   * Handles Facebook authentication.
   *
   * @param req - The request object containing the Facebook OAuth token in the body.
   * @param res - The response object used to send back the result.
   *
   * @returns A JSON response containing the JWT token and user information.
   */
  static async facebook(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const { jwtToken, user } = await UserAuthModel.facebook(token);
      res.json({ token: jwtToken, user });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  /**
   * Handles Apple authentication.
   *
   * @param req - The request object containing the Apple identity token in the body.
   * @param res - The response object used to send back the result.
   *
   * @returns A JSON response containing the JWT token and user information.
   */
  static async apple(req: Request, res: Response) {
    try {
      const { token } = req.body;
      const { jwtToken, user } = await UserAuthModel.apple(token);
      res.json({ token: jwtToken, user });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }
}
