import axios from 'axios';

export interface FacebookUserInfo {
  id: string;
  email: string;
  name: string;
  first_name: string;
  last_name: string;
  picture: {
    data: {
      url: string;
    };
  };
}

export class FacebookService {
  /**
   * Retrieves user information from Facebook using an OAuth token
   * @param token - The OAuth token from Facebook
   * @returns Promise containing the user's Facebook information
   * @throws Error if the token is invalid or the request fails
   */
  static async getUserInfo(token: string): Promise<FacebookUserInfo> {
    try {
      const response = await axios.get('https://graph.facebook.com/v18.0/me', {
        params: {
          fields: 'id,email,name,first_name,last_name,picture',
          access_token: token
        }
      });

      return response.data as FacebookUserInfo;
    } catch (error: any) {
      throw new Error(`Failed to get Facebook user info: ${error.message}`);
    }
  }
} 