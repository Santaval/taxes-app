import { useAuth } from "@/contexts/AuthContext";
import { useDateRange } from "@/contexts/DateRangeContext";
import ReportsService from "@/services/ReportsService";
import { ReportsDataMap } from "@/types/Reports";
import { useEffect, useState } from "react";

function useReport<K extends keyof ReportsDataMap = 'balance'>(reportType: K = 'balance' as K) {
  const { user } = useAuth();
  const { range } = useDateRange();
  const [reportData, setReportData] = useState<ReportsDataMap[K] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReportData = async () => {
      if (user) {
        setLoading(true);
        setError(null);
        try {
          const data = await ReportsService.get(reportType, {
            from: range.from.toISOString(),
            to: range.to.toISOString(),
          });
          setReportData(data);
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Error fetching report data');
          setReportData(null);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchReportData();
  }, [user, reportType, range]);

  return { reportData, loading, error };
};


export default useReport;