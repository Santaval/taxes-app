import { AxiosError } from "axios";
import api from "./api";
import { ReportsDataMap } from "@/types/Reports";
import moment from "moment";

interface ApiErrorResponse {
  message: string;
}

export interface DateRangeConfig {
  from: string | Date;
  to: string | Date;
}

export default class ReportsService {
  /**
   * Retrieves report data from API for a specific date range
   * 
   * @param {string} reportType - The type of report to retrieve
   * @param {DateRangeConfig} config - Date range configuration
   * @returns {Promise<T[keyof T]>} A promise that resolves to the report data
   * @throws {Error} If the request fails.
   */
  static async get<T extends ReportsDataMap>(reportType: string, config?: DateRangeConfig): Promise<T[keyof T]> {
    try {
      const urlQuery = new URLSearchParams();
      if (config) {
        urlQuery.append("from", moment(config.from).format("YYYY-MM-DD"));
        urlQuery.append("to", moment(config.to).format("YYYY-MM-DD"));
      } else {
        // Default to current month if no range specified
        urlQuery.append("from", moment().startOf('month').format("YYYY-MM-DD"));
        urlQuery.append("to", moment().endOf('month').format("YYYY-MM-DD"));
      }
      const { data } = await api.get<T[keyof T]>(`/reports/${reportType}`, {
        params: urlQuery,
      });
      return data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiErrorResponse>;
      throw new Error(axiosError.response?.data?.message || axiosError.message);
    }
  }


}