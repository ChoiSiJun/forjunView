import { AxiosError } from 'axios';
import { useMutationWithLoading } from '@config/hooks/useMutationWithLoading';
import axios from '@config/axios/axios';
import { HISTORY_API_ENDPOINTS } from '@domain/history/api/HistoryApi';
import { GetRequestType } from '@common/utill/type-utils';

const useHistoryDeleteMutation = () => {
  type HistoryDeleteParma = GetRequestType<typeof HISTORY_API_ENDPOINTS.delete>;

  const fetchDeleteHistory = async (params: HistoryDeleteParma) => {
    const response = await axios({
      method: HISTORY_API_ENDPOINTS.delete.method,
      url: HISTORY_API_ENDPOINTS.delete.url,
      data: params,
    });
    return response.data;
  };

  return useMutationWithLoading<void, AxiosError, HistoryDeleteParma>({
    mutationFn: async (params: HistoryDeleteParma) =>
      fetchDeleteHistory(params),
  });
};

export default useHistoryDeleteMutation;
