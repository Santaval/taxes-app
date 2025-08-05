import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RENSEND_API_KEY);

export default class ResendService {
  /**
   * Sends an email using the Resend service.
   *
   * @param to - The recipient's email address.
   * @param subject - The subject of the email.
   * @param html - The HTML content of the email.
   * @returns The data returned by the Resend service upon successful sending of the email.
   * @throws An error if the email could not be sent.
   */
  static async send(to: string, subject: string, html: string) {
    console.log(`${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`)
    const { data, error } = await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
      to,
      subject,
      html,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
