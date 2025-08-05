import axios from 'axios';

export interface GoogleUserInfo {
  id: string;
  email: string;
  verified_email: boolean;
  name: string;
  given_name: string;
  family_name: string;
  picture: string;
  locale: string;
}

interface GooglePersonInfo {
  birthdays?: Array<{
    date: {
      year: number;
      month: number;
      day: number;
    };
  }>;
}

export class GoogleService {
  /**
   * Retrieves user information from Google using an OAuth token
   * @param token - The OAuth token from Google
   * @returns Promise containing the user's Google information
   * @throws Error if the token is invalid or the request fails
   */
  static async getUserInfo(token: string): Promise<GoogleUserInfo> {
    try {
      const response = await axios.get('https://www.googleapis.com/userinfo/v2/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return response.data as GoogleUserInfo;  
    } catch (error: any) {
      throw new Error(`Failed to get Google user info: ${error.message}`);
    }
  }

  /**
   * Retrieves user's birthday from Google People API
   * @param token - The OAuth token from Google
   * @returns Promise containing the user's birthday information
   * @throws Error if the token is invalid or the request fails
   */
  static async getUserBirthday(token: string): Promise<Date | null> {
    try {
      const response = await axios.get('https://people.googleapis.com/v1/people/me?personFields=birthdays', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const personInfo = response.data as GooglePersonInfo;
      
      if (personInfo.birthdays && personInfo.birthdays.length > 0) {
        const birthday = personInfo.birthdays[0].date;
        return new Date(birthday.year, birthday.month - 1, birthday.day);
      }

      return null;
    } catch (error: any) {
      throw new Error(`Failed to get Google user birthday: ${error.message}`);
    }
  }
} 