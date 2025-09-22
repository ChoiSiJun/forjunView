import axios from '@config/axios/axios';
import { useQueryWithLoading } from '@config/hooks/useQueryWithLoading';

interface HistoryParams {
  category: string;
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
    .get<HistoryListResponse[]>(import.meta.env.VITE_REST_API + '/histories', {
      params,
    })

    .then(res => res.data);
};

const useHistoryQuery = (params: HistoryParams) => {
  return useQueryWithLoading<HistoryListResponse[]>({
    queryKey: ['history', params], // 고정된 key
    queryFn: () => fetchHistory(params),
  });
};

export default useHistoryQuery;
