import { AxiosError } from 'axios';
import { useMutationWithLoading } from '@config/hooks/useMutationWithLoading';
import axios from '@config/axios/axios';
import { GetRequestType } from '@common/utill/type-utils';
import { HISTORY_API_ENDPOINTS } from '@domain/history/api/HistoryApi';

type HistorySaveParma = GetRequestType<typeof HISTORY_API_ENDPOINTS.save>;

const useHistoryInsertMutation = () => {
  const fetchHistorySave = async (params: HistorySaveParma) => {
    const response = await axios({
      method: HISTORY_API_ENDPOINTS.save.method,
      url: HISTORY_API_ENDPOINTS.save.url,
      data: params,
    });
    return response.data;
  };

  return useMutationWithLoading<void, AxiosError, HistorySaveParma>({
    mutationFn: async (params: HistorySaveParma) => fetchHistorySave(params),
  });
};

export default useHistoryInsertMutation;
