import { AxiosError } from "axios";
import api from "./api";
import { ReportsDataMap } from "@/types/Reports";
import moment from "moment";

interface ApiErrorResponse {
  message: string;
}

type Config = {
  month: number;
  year: number
}

export default class ReportsService {
  /**
   * Retrieves the balance report from API
   * 
   * @returns {Promise<BalanceReport>} A promise that resolves to Balance report data.
   * @throws {Error} If the request fails.
   */
  static async get<T extends ReportsDataMap>(reportType: string, config?: Config): Promise<T[keyof T]> {
    try {
      const urlQuery = new URLSearchParams();
      urlQuery.append("month", config?.month.toString() || moment().get("month").toString());
      urlQuery.append("year", config?.year.toString() || moment().get("year").toString());
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