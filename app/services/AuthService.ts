import { User, UserUpdate, NewUser } from "@/types/User";
import api from "@/services/api";
import { AxiosError } from "axios";

interface ApiErrorResponse {
  message: string;
}

export default class AuthService {
  /**
   * Signs up a new user with the provided email.
   *
   * Sends a POST request to the "/auth/signup" endpoint with the email.
   * If the request is successful, the function completes without returning any value.
   * If an error occurs, it throws an error with the message from the API response or the error message.
   *
   * @param email - The email address of the user to sign up.
   * @throws {Error} If the signup request fails, an error is thrown with the relevant message.
   */
  static async signup(body: NewUser): Promise<{ token: string }> {
    try {
      const { data } = await api.post(`/auth/signup`, body);
      console.log("Signup successful:", data);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }

  /**
   * Sends an OTP (One-Time Password) to the provided email address.
   *
   * @param email - The email address of the user.
   * @returns A promise that resolves when the OTP is sent successfully.
   * @throws An error if the OTP request fails, with the error message from the API response.
   */
  static async sendOTP(email: string): Promise<void> {
    try {
      await api.post(`auth/otp`, {
        email,
      });
      return;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }

  /**
   * Logs in a user using their email and OTP (One-Time Password).
   *
   * @param email - The email address of the user.
   * @param otp - The one-time password for authentication.
   * @returns A promise that resolves to a `User` object upon successful login.
   * @throws An error if the login request fails, with the error message from the API response.
   */
  static async login(email: string, password: string): Promise<{ token: string }> {
    try {
      const { data } = await api.post<{ token: string }>(`auth/login`, {
        email,
        password,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }

  /**
   * Logs in a user using their Google account.
   *
   * @param token - The Google authentication token.
   * @returns A promise that resolves to a `User` object upon successful login.
   * @throws An error if the login request fails, with the error message from the API response.
   */
  static async googleAuth(
    token: string
  ): Promise<{ token: string; user: User }> {
    try {
      const { data } = await api.post<{ token: string; user: User }>(
        `auth/google`,
        {
          token,
        }
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }

  /**
   * Logs in a user using their Facebook account.
   *
   * @param token - The Facebook authentication token.
   * @returns A promise that resolves to a `User` object upon successful login.
   * @throws An error if the login request fails, with the error message from the API response.
   */
  static async facebookAuth(
    token: string
  ): Promise<{ token: string; user: User }> {
    try {
      const { data } = await api.post<{ token: string; user: User }>(
        `auth/facebook`,
        {
          token,
        }
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }

  /**
   * Logs in a user using their Apple account.
   *
   * @param token - The Apple authentication token.
   * @returns A promise that resolves to a `User` object upon successful login.
   * @throws An error if the login request fails, with the error message from the API response.
   */
  static async appleAuth(
    token: string
  ): Promise<{ token: string; user: User }> {
    try {
      const { data } = await api.post<{ token: string; user: User }>(
        `auth/apple`,
        {
          token,
        }
      );
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }

  static async completeProfile(userData: UserUpdate): Promise<void> {
    try {
      await api.put(`auth/profile`, userData);
      return;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }

  static async getUser(): Promise<User> {
    try {
      const { data } = await api.get<User>(`auth/user`);
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }
}
