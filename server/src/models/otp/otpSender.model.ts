import OtpMailTemplate from "../../utils/mail/templates/otp.template";
import ResendService from "../../services/resend.service";
import UserManagerModel from "../client/usersManager.model";
import OtpManagerModel from "./otpManager.model";

export default class OTPSenderModel {
  /**
   * Sends an OTP (One-Time Password) to the given email address.
   *
   * @param email - The email address to which the OTP will be sent.
   * @returns A promise that resolves when the OTP has been sent.
   */
  static async send(email: string): Promise<void> {
    const user = await UserManagerModel.find("email", email);
    if (!user) throw new Error("Mail is not registered");
    const otp = await OtpManagerModel.create(user.id);
    if (!otp) throw new Error("OTP could not be generated.");
    await ResendService.send(
      email,
      "🔐 Tu código de inicio de sesión seguro",
      OtpMailTemplate(user.name, otp.code.toString())
    );
    return;
  }
}
