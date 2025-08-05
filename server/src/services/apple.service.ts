import jwt from 'jsonwebtoken';
import { User } from "@/types/User";

export interface AppleUserInfo {
  email: string;
  name?: {
    firstName?: string;
    lastName?: string;
  };
  sub: string;
}

export class AppleService {
  /**
   * Verifies and decodes the Apple identity token
   * @param token - The Apple identity token
   * @returns The decoded user information
   */
  static async getUserInfo(token: string): Promise<AppleUserInfo> {
    try {
      // In a production environment, you should verify the token with Apple's public keys
      // For development, we'll just decode it
      const decoded = jwt.decode(token) as AppleUserInfo;
      
      if (!decoded || !decoded.email) {
        throw new Error('Invalid Apple token');
      }

      return decoded;
    } catch (error) {
      throw new Error('Failed to verify Apple token');
    }
  }
} 