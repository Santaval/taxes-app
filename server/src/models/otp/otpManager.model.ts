import OtpsRepository from "../../repository/otps.repository";
import { OTP, OTPFields } from "@/types/OTP";
import generateOTP from "../../utils/otp/otpGenerator";
import { v4 } from "uuid";

export default class OtpManagerModel {
  /**
   * Creates a new OTP (One-Time Password) entry for the given user.
   *
   * @param userID - The ID of the user for whom the OTP is being created.
   * @returns A promise that resolves when the OTP entry has been created.
   */
  static async create(userID: string) : Promise<OTP> {
    const otp = generateOTP() ;
    const id = v4();
    const fields:OTPFields[] = ["userID", "code", "id"]; ;
    const values = [userID, otp, id];
    await OtpsRepository.create(fields, values);
    return this.find(otp);
  }

  /**
   * Finds an OTP (One-Time Password) by its code.
   *
   * @param code - The OTP code to search for.
   * @returns A promise that resolves to the found OTP.
   */
  static async find(code: string) : Promise<OTP> {
    return OtpsRepository.find("code", code);
  }

  /**
   * Deletes an OTP entry from the repository.
   *
   * @param otpID - The unique identifier of the OTP to be deleted.
   * @returns A promise that resolves when the OTP is successfully deleted.
   */
  static async delete(otpID: string) {
    return OtpsRepository.delete(otpID);
  }
}