import OtpManagerModel from "./otpManager.model";

export default class OtpValidatorModel {
  /**
   * Validates an OTP (One-Time Password) code.
   *
   * @param code - The OTP code to validate.
   * @returns A promise that resolves to true if the OTP is valid, or false if it is not.
   */
  static async validate(code: string): Promise<boolean> {
    const otp = await OtpManagerModel.find(code);
    if (!otp) {
      return false;
    }
    const now = new Date();
    const created_at = new Date(otp.createdAt);
    const diff = now.getTime() - created_at.getTime();
    // If the OTP is older than 5 minutes, it is invalid.

    await OtpManagerModel.delete(otp.id);

    if (diff > 1000 * 60 * 5) {
      return false;
    }
    return true;
  }
}
