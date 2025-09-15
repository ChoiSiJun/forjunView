import axios from '@api/config/axios/axios';
import { useQueryWithLoading } from '@api/config/hooks/useQueryWithLoading';

interface HistoryParams {
  category: string;
  userId?: string | undefined;
}

export interface HistoryListResponse {
  id: number;
  category: string;
  description: string;
  historyEndDate: string;
  historySkill: string[];
  historyStartDate: string;
  project: string;
  subject: string;
}

const fetchHistory = async (
  params: HistoryParams,
): Promise<HistoryListResponse[]> => {
  return axios
    .get<HistoryListResponse[]>(
      import.meta.env.VITE_REST_API + '/web/histories',
      {
        params,
      },
    )

    .then(res => res.data);
};

const useWebHistoryQuery = (params: HistoryParams) => {
  return useQueryWithLoading<HistoryListResponse[]>({
    queryKey: ['web/history', params], // 고정된 key
    queryFn: () => fetchHistory(params),
  });
};

export default useWebHistoryQuery;
