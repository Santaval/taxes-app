

interface Config {
  apiUrl: string;
  apiKey: string;
  env: string;
  iosAdMobKey: string;
  androidAdMobKey: string;
  isDevelopment: boolean;
  isProduction: boolean;
}

const config: Config = {
  apiUrl: process.env.EXPO_PUBLIC_API_URL as string,
  apiKey: process.env.EXPO_PUBLIC_API_KEY as string,
  iosAdMobKey: process.env.EXPO_PUBLIC_IOS_ADMOB_KEY as string,
  androidAdMobKey: process.env.EXPO_PUBLIC_ANDROID_ADMOB_KEY as string,
  env: "development",
  isDevelopment: true,
  isProduction: false,
};

export default config; 