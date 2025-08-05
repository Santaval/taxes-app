export interface OTP {
    userID: string;
    otp: string;
    createdAt: string;
    code: number;
    id: string;
}

export type OTPFields = keyof OTP;
