import { Moment } from "moment";

export interface Workday {
  id: string; // Unique identifier for the workday register
  createdAt?: Moment; // Timestamp when the workday register was created
  updatedAt?: Moment; // Timestamp when the workday register was last updated
  date: string; // Date of the workday
  initHour: string; // Start time of the workday
  endHour: string; // End time of the workday
  companyID: string; // ID of the company associated with the workday
  employeeID: string; // ID of the employee associated with the workday
  hoursWorked: number; // Total hours worked during the workday
  jobType: "operario" | "supervisor" | "gerente"; // Type of job for the workday
  salary: number; // Salary for the workday
  notes?: string; // Optional notes for the workday
  imageUrl: string; // URL of the image associated with the workday
}


export type NewWorkday = Omit<Workday, | "createdAt" | "updatedAt">;

export type WorkdayFields = keyof Workday;