import { z } from "zod";

export const NewTransactionSchema = z.object({
  type: z.enum(["ingreso", "egreso"], {
    message: "Type must be ingreso or egreso",
  }),
  description: z.string().max(255).optional(),
  category: z.string().max(100).optional(),
  amount: z.number({
    message: "Amount is required",
  }).positive({
    message: "Amount must be positive",
  }),
  hasVat: z.boolean().default(true),
  vatRate: z.number().min(0).max(100).default(13.00),
  date: z.string({
    message: "Date is required",
  }).regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "Date must be in YYYY-MM-DD format",
  }),
});

export const UpdateTransactionSchema = z.object({
  type: z.enum(["ingreso", "egreso"]).optional(),
  description: z.string().max(255).optional(),
  category: z.string().max(100).optional(),
  amount: z.number().positive().optional(),
  hasVat: z.boolean().optional(),
  vatRate: z.number().min(0).max(100).optional(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
