import api from "@/services/api";
import AuthService from "@/services/AuthService";
import { User } from "@/types/User";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { createContext, useContext, useEffect, useState } from "react";

/**
 * Represents the authentication state of the application
 * @interface AuthState
 */
interface AuthState {
  /** JWT token for API authentication */
  token: string | null;
  /** Whether the user is currently authenticated */
  authenticated: boolean;
  /** Whether an async operation is in progress */
  isLoading: boolean;
  /** Current error message, if any */
  error: string | null;
}

/**
 * Defines the shape of the authentication context
 * @interface AuthContextType
 */
interface AuthContextType {
  /** Email address used for authentication */
  authMail: string;
  /** Function to set the authentication email */
  setAuthMail: (mail: string) => void;
  /** Current authenticated user data */
  user: User | null;
  /** Function to authenticate user with email and password*/
  login: (email: string, password: string) => Promise<void>;
  /** Function to register a new user */
  register: (email: string, password: string) => Promise<void>;
  /** Function to authenticate user with Google */
  googleAuth: (token: string) => Promise<void>;
  /** Function to authenticate user with Facebook */
  facebookAuth: (token: string) => Promise<void>;
  /** Function to authenticate user with Apple */
  appleAuth: (token: string) => Promise<void>;
  /** Function to log out the current user */
  logout: () => Promise<void>;
  /** Function to send OTP to user's email */
  sendOtp: () => Promise<void>;
  /** Current authentication state */
  authState: AuthState;
  /** Function to clear any current error */
  clearError: () => void;
  /** Function to update user data */
  updateUser: (userData: Partial<User>) => Promise<void>;
  /** Function to refresh user data */
  refreshUser: () => Promise<void>;
}

/**
 * Initial state for authentication
 */
const initialState: AuthState = {
  token: null,
  authenticated: false,
  isLoading: false,
  error: null,
};

/**
 * Context for managing authentication state throughout the application
 */
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  register: async () => {},
  googleAuth: async () => {},
  facebookAuth: async () => {},
  appleAuth: async () => {},
  logout: async () => {},
  authMail: "",
  setAuthMail: () => {},
  sendOtp: async () => {},
  authState: initialState,
  clearError: () => {},
  updateUser: async () => {},
  refreshUser: async () => {},
});

/**
 * Provider component that manages authentication state and provides authentication methods
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to be wrapped with auth context
 */
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [authMail, setAuthMail] = useState<string>("");
  const [authState, setAuthState] = useState<AuthState>(initialState);

  /**
   * Updates the loading state
   * @param {boolean} isLoading - Whether an async operation is in progress
   */
  const setLoading = (isLoading: boolean) => {
    setAuthState(prev => ({ ...prev, isLoading }));
  };

  /**
   * Sets an error message in the auth state
   * @param {string | null} error - Error message to set
   */
  const setError = (error: string | null) => {
    setAuthState(prev => ({ ...prev, error }));
  };

  /**
   * Clears any current error message
   */
  const clearError = () => setError(null);

  /**
   * Updates the authentication state with new token and authentication status
   * @param {string | null} token - New authentication token
   * @param {boolean} authenticated - Whether the user is authenticated
   */
  const updateAuthState = (token: string | null, authenticated: boolean) => {
    setAuthState(prev => ({
      ...prev,
      token,
      authenticated,
      error: null,
    }));
  };

  /**
   * Sets up API authentication headers with the provided token
   * @param {string | null} token - Token to set in API headers
   */
  const setupApiAuth = (token: string | null) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };

  const googleAuth = async (token: string) => {
    const { token: jwtToken, user } = await AuthService.googleAuth(token)
    await SecureStore.setItemAsync("token", jwtToken);
    setupApiAuth(jwtToken);
    updateAuthState(jwtToken, true);
    setUser(user);
    router.replace(user.completedProfile ? "/(tabs)/home" : "/auth/complete");
  };

  const facebookAuth = async (token: string) => {
    const { token: jwtToken, user } = await AuthService.facebookAuth(token)
    await SecureStore.setItemAsync("token", jwtToken);
    setupApiAuth(jwtToken);
    updateAuthState(jwtToken, true);
    setUser(user);
    router.replace(user.completedProfile ? "/(tabs)/home" : "/auth/complete");
  };

  const appleAuth = async (token: string) => {
    const { token: jwtToken, user } = await AuthService.appleAuth(token)
    await SecureStore.setItemAsync("token", jwtToken);
    setupApiAuth(jwtToken);
    updateAuthState(jwtToken, true);
    setUser(user);
    router.replace(user.completedProfile ? "/(tabs)/home" : "/auth/complete");
  };



  /**
   * Effect hook to load and validate stored authentication token on mount
   */
  useEffect(() => {
    const loadToken = async () => {
      try {
        setLoading(true);
        const token = await SecureStore.getItemAsync("token");
        
        if (token) {
          setupApiAuth(token);
          const user = await AuthService.getUser();
          
          if (user) {
            updateAuthState(token, true);
            setUser(user);
            router.replace(user.completedProfile ? "/(tabs)/home" : "/auth/complete");
          } else {
            await handleLogout();
          }
        }
      } catch (error) {
        console.error("Error loading token:", error);
        await handleLogout();
        setError(error instanceof Error ? error.message : "Failed to load user session");
      } finally {
        setLoading(false);
      }
    };

    loadToken();
  }, []);

  const refreshUser = async () => {
    try {
      const user = await AuthService.getUser();
      setUser(user);
    } catch (error) {
      await handleLogout();
    }
    }

  /**
   * Handles the logout process by clearing auth state and removing stored token
   */
  const handleLogout = async () => {
    updateAuthState(null, false);
    setUser(null);
    await SecureStore.deleteItemAsync("token");
    setupApiAuth(null);
  };

  /**
   * Authenticates a user with the provided OTP
   * @param {string} otp - One-time password for authentication
   * @throws {Error} If no email is provided or authentication fails
   */
  const login = async (email: string, password:string): Promise<void> => {
    try {
      if (!email) {
        throw new Error("No email provided");
      }

      setLoading(true);
      const { token } = await AuthService.login(email, password);
      await SecureStore.setItemAsync("token", token);
      setupApiAuth(token);
      
      const user = await AuthService.getUser();
      updateAuthState(token, true);
      setUser(user);
      
      // Reset navigation stack to prevent going back
      const destination = user.completedProfile ? '/(tabs)/home' : '/auth/complete';
      router.replace(destination);
      
      // Prevent back navigation by replacing the navigation history
      router.setParams({});
    } catch (error) {
      setError(error instanceof Error ? error.message : "Login failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Registers a new user with the provided email and password
   * @param {string} email - Email address for registration
   * @param {string} password - Password for the new user
   * @throws {Error} If registration fails
   */
  const register = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);
      const { token } = await AuthService.signup({ email, password });
      await SecureStore.setItemAsync("token", token);
      setupApiAuth(token);
      const user = await AuthService.getUser();
      updateAuthState(token, true);
      setUser(user);
      router.replace("/auth/complete");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Registration failed");
      throw error;
    } finally {
      setLoading(false);
    }
  }

  /**
   * Sends a one-time password to the user's email
   * @throws {Error} If no email is provided or OTP sending fails
   */
  const sendOtp = async (): Promise<void> => {
    try {
      if (!authMail) {
        throw new Error("No email provided");
      }

      setLoading(true);
      await AuthService.sendOTP(authMail);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to send OTP");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Logs out the current user and redirects to login page
   * @throws {Error} If logout process fails
   */
  const logout = async (): Promise<void> => {
    try {
      setLoading(true);
      await handleLogout();
      // Reset the navigation stack and redirect to login
      router.replace("/auth/login");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Logout failed");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  /**
   * Updates the user data and refreshes the local state
   * @param userData - Partial user data to update
   */
  const updateUser = async (userData: Partial<User>): Promise<void> => {
    try {
      setLoading(true);
      if (user) {
        const updatedUser = await AuthService.getUser();
        setUser({ ...updatedUser, ...userData });
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to update user");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        googleAuth,
        facebookAuth,
        appleAuth,
        authMail,
        setAuthMail,
        sendOtp,
        authState,
        clearError,
        updateUser,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Custom hook to access authentication context
 * @returns {AuthContextType} The authentication context
 * @throws {Error} If used outside of AuthProvider
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
