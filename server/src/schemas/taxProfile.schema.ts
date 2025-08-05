import { z } from "zod";

export const NewTaxProfileSchema = z.object({
  contributorType: z.enum(["persona_fisica", "persona_juridica"], {
    message: "Contributor type must be persona_fisica or persona_juridica",
  }),
  paysIva: z.boolean({
    message: "paysIva is required",
  }),
  paysRenta: z.boolean({
    message: "paysRenta is required",
  }),
  monthlyIvaDue: z.boolean({
    message: "monthlyIvaDue is required",
  }),
  notes: z.string().optional(),
});

export const UpdateTaxProfileSchema = z.object({
  contributorType: z.enum(["persona_fisica", "persona_juridica"]).optional(),
  paysIva: z.boolean().optional(),
  paysRenta: z.boolean().optional(),
  monthlyIvaDue: z.boolean().optional(),
  notes: z.string().optional(),
});
