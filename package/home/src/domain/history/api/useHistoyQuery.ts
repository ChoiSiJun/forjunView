import { HISTORY_API_ENDPOINTS } from '@domain/history/api/HistoryApi';
import { useQueryWithLoading } from '@config/hooks/useQueryWithLoading';
import { GetResponseType, GetRequestType } from '@common/utill/type-utils';
import axios from '@config/axios/axios';

type HistoryListRequest = GetRequestType<typeof HISTORY_API_ENDPOINTS.get>;
type HistoryListResponse = GetResponseType<typeof HISTORY_API_ENDPOINTS.get>;

const fetchHistory = async (
  params: HistoryListRequest,
): Promise<HistoryListResponse[]> => {
  const response = await axios({
    method: HISTORY_API_ENDPOINTS.get.method,
    params: params,
    url: HISTORY_API_ENDPOINTS.get.url,
  });

  return response.data;
};

const useHistoryQuery = (params: HistoryListRequest) => {
  return useQueryWithLoading<HistoryListResponse[]>({
    queryKey: ['history', params],
    queryFn: () => fetchHistory(params),
  });
};

export default useHistoryQuery;
