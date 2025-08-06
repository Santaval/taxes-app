import { useAuth } from "@/contexts/AuthContext";
import ReportsService from "@/services/ReportsService";
import { ReportsDataMap } from "@/types/Reports";
import { useEffect, useState } from "react";

function useReport<K extends keyof ReportsDataMap = 'balance'>(reportType: K = 'balance' as K) {
  const { user } = useAuth();
  const [reportData, setReportData] = useState<ReportsDataMap[K] | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (user) {
        const data = await ReportsService.get(reportType);
        setReportData(data);
      }
    };

    fetchReportData();
  }, [user, reportType]);

  return { reportData };
};


export default useReport;