import { z } from "zod";

export const newWorkdaySchema = z.object({
  date: z.string(), // ISO date string
  initHour: z.string().min(1),
  endHour: z.string().min(1),
  hoursWorked: z.number().min(0),
  jobType: z.enum(["operario", "supervisor", "gerente"]),
  salary: z.number().min(0),
  notes: z.string().optional(),
  imageUrl: z.string().url(),
});