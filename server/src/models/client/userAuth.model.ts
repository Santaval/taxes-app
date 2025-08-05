import { GoogleService, GoogleUserInfo } from "../../services/google.service";
import { FacebookService, FacebookUserInfo } from "../../services/facebook.service";
import { AppleService, AppleUserInfo } from "../../services/apple.service";
import signJwt from "../../utils/jwt/sign";
import OTPSenderModel from "../otp/otpSender.model";
import OtpValidatorModel from "../otp/otpValidator.model";
import UsersDataModel from "./usersManager.model";
import { NewUser, User } from "@/types/User";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import { v4 } from "uuid";

dotenv.config();

export default class UserAuthModel {
  /**
   * Authenticates a user using their email and a one-time password (OTP).
   *
   * @param email - The email address of the user attempting to log in.
   * @param otp - The one-time password provided for authentication.
   * @returns A promise that resolves to a JWT token if authentication is successful.
   * @throws Will throw an error if the email is not found or the OTP is invalid.
   */
  static async login(
    email: string,
    password: string
  ): Promise<{ token: string; user: User }> {

    

    // If the email is a system email in development, bypass normal login
    if (email === "system@savaldev.com" && process.env.ENV=== "development") {
      const user = await UsersDataModel.find("email", email);
      if (!user) throw new Error("Invalid email or password.");
      const token = signJwt(user);
      return { token, user };
    }

    const user = await UsersDataModel.find("email", email);
    if (!user) throw new Error("Invalid email or password.");
    const isPasswordValid = await bcrypt.compare(password, user.password as string);
    if (!isPasswordValid) throw new Error("email or password.");
    const token = signJwt(user);
    return { token, user };
  }

  static async loginAdmin(
    email: string,
  ) {
    const user = await UsersDataModel.find("email", email);
    console.log(user);
    if (!user) throw new Error("Invalid email or password.");
    const token = signJwt(user);
    return { token, user };
  }

  /**
   * Registers a new user in the system.
   *
   * @param email - The email address of the user to be registered.
   * @throws Will throw an error if a user with the given email already exists.\
   * @returns A promise that resolves to a JWT token for the newly registered user.
   */
  static async signup(email: string, password: string): Promise<string> {
    const existUser = await UsersDataModel.find("email", email);
    if (existUser) throw new Error("User already exists.");
    const user = await UsersDataModel.create(email, password);
    if (!user) throw new Error("Failed to create user.");
    return signJwt(user);
  }

  /**
   * Sends an OTP (One-Time Password) to the specified email address.
   *
   * @param email - The email address to which the OTP will be sent.
   * @throws Will throw an error if the email is not registered.
   */
  static async sendOtp(email: string) {
    const user = await UsersDataModel.find("email", email);
    if (!user) throw new Error("Mail is not registered");
    await OTPSenderModel.send(email);
  }

  /**
   * Completes the user authentication process by updating the user data.
   *
   * @param userID - The unique identifier of the user.
   * @param data - The new user data to update.
   * @returns A promise that resolves when the user data has been updated.
   */
  static async complete(userID: string, data: NewUser) {
    await UsersDataModel.update(userID, data);
    const user = await UsersDataModel.find("id", userID);
    if (!user) throw new Error("Failed to update user data.");
    return user;
  }

  /**
   * Creates a new user from Google data
   * @param userGoogleData - The user data from Google
   * @param token - The Google OAuth token
   * @returns The newly created user
   */
  private static async createGoogleUser(userGoogleData: GoogleUserInfo, token: string): Promise<User> {
    const user = await UsersDataModel.create(userGoogleData.email);
    if (!user) throw new Error("Failed to create user");
    const newUserData: NewUser = {
      email: userGoogleData.email,
      name: userGoogleData.name,
      password: v4(), // Generate a random password for the user
    };

    await this.complete(user.id, newUserData);
    const completedUser = await UsersDataModel.find("id", user.id);
    if (!completedUser) throw new Error("Failed to create user");
    return completedUser;
  }

  /**
   * Handles Google authentication
   * @param token - The Google OAuth token
   * @returns Object containing JWT token and user data
   */
  static async google(token: string) {
    const userGoogleData = await GoogleService.getUserInfo(token);
    
    // Find existing user or create new one
    let user = await UsersDataModel.find("email", userGoogleData.email);
    if (!user) {
      user = await this.createGoogleUser(userGoogleData, token);
    }

    const jwtToken = signJwt(user);
    return { jwtToken, user };
  }

  /**
   * Creates a new user from Facebook data
   * @param userFacebookData - The user data from Facebook
   * @param token - The Facebook OAuth token
   * @returns The newly created user
   */
  private static async createFacebookUser(userFacebookData: FacebookUserInfo, token: string): Promise<User> {
    const user = await UsersDataModel.create(userFacebookData.email);
    if (!user) throw new Error("Failed to create user");
    const newUserData: NewUser = {
      email: userFacebookData.email,
      name: userFacebookData.name,
      password: v4(), // Generate a random password for the user
    };

    await this.complete(user.id, newUserData);
    const completedUser = await UsersDataModel.find("id", user.id);
    if (!completedUser) throw new Error("Failed to create user");
    return completedUser;
  }

  /**
   * Handles Facebook authentication
   * @param token - The Facebook OAuth token
   * @returns Object containing JWT token and user data
   */
  static async facebook(token: string) {
    const userFacebookData = await FacebookService.getUserInfo(token);
    
    // Find existing user or create new one
    let user = await UsersDataModel.find("email", userFacebookData.email);
    if (!user) {
      user = await this.createFacebookUser(userFacebookData, token);
    }

    const jwtToken = signJwt(user);
    return { jwtToken, user };
  }

  /**
   * Creates a new user from Apple data
   * @param userAppleData - The user data from Apple
   * @param token - The Apple identity token
   * @returns The newly created user
   */
  private static async createAppleUser(userAppleData: AppleUserInfo, token: string): Promise<User> {
    const user = await UsersDataModel.create(userAppleData.email);
    if (!user) throw new Error("Failed to create user");
    const newUserData: NewUser = {
      email: userAppleData.email,
      name: userAppleData.name?.firstName || '',
      password: v4(), // Generate a random password for the user
    };


    await this.complete(user.id, newUserData);
    const createdUser = await UsersDataModel.find("id", user.id);
    if (!createdUser) throw new Error("Failed to create user");
    return createdUser;
  }

  /**
   * Handles Apple authentication
   * @param token - The Apple identity token
   * @returns Object containing JWT token and user data
   */
  static async apple(token: string) {
    const userAppleData = await AppleService.getUserInfo(token);
    
    // Find existing user or create new one
    let user = await UsersDataModel.find("email", userAppleData.email);
    if (!user) {
      user = await this.createAppleUser(userAppleData, token);
    }

    const jwtToken = signJwt(user);
    return { jwtToken, user };
  }
}
