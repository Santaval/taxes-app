import { Transaction } from "@/types/Transaction";
import TransactionModel from "./transaction.model";

export default class ReportsModel {
  /**
   * Generates an IVA report for a given user, month, and year.
   *
   * @param userId - The ID of the user.
   * @param month - The month for which to generate the report (1-12).
   * @param year - The year for which to generate the report (e.g., 2023).
   * @returns A promise that resolves to the IVA report data.
   */
  static async iva(userId: string, month: number, year: number): Promise<any> {
    const transactions = await TransactionModel.findAll("userID", userId);
    let vatCharged = 0;
    let vatDeductible = 0;

   

    for (const tx of transactions) {
      tx.amount = parseFloat(tx.amount.toString());
      tx.vatRate = parseFloat(tx.vatRate.toString());
      if (!tx.hasVat || !tx.vatRate || tx.amount === 0) continue;

      // Extraer el IVA del monto total (suponiendo que ya viene con IVA incluido)
      const amountWithoutIva = tx.amount / (1 + tx.vatRate / 100);
      const iva = tx.amount - amountWithoutIva;

      if (tx.type === "ingreso") {
        vatCharged += iva;
      } else if (tx.type === "egreso") {
        vatDeductible += iva;
      }
    }

    return {
    month: String(month).padStart(2, '0'),
    year,
    vatCharged: Math.round(vatCharged),
    vatDeductible: Math.round(vatDeductible),
    vatNet: Math.round(vatCharged - vatDeductible)
  };
  }
}
