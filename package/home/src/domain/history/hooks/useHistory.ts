import useHistoryDeleteMutation from '@domain/history/api/useHistoryDeleteMutation';
import useHistoryInsertMutation from '@domain/history/api/useHistoryInsertMutation';
import useHistoryQuery from '@domain/history/api/useHistoyQuery';
import { HISTORY_API_ENDPOINTS } from '@domain/history/api/HistoryApi';
import { GetRequestType } from '@common/utill/type-utils';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

const useHistory = (category: string) => {
  type HistorySaveParma = GetRequestType<typeof HISTORY_API_ENDPOINTS.save>;
  type HistoryDeleteParma = GetRequestType<typeof HISTORY_API_ENDPOINTS.delete>;
  /** Mutation & Query */
  const queryClient = useQueryClient();
  const getHistoryList = useHistoryQuery({ category: category }).data;
  const insertHistory = useHistoryInsertMutation().mutateAsync;
  const deleteHistory = useHistoryDeleteMutation().mutateAsync;

  /** 핸들러 */
  const handleInsertHistory = async (params: HistorySaveParma) => {
    await insertHistory(params);
    queryClient.invalidateQueries(['history']);
    toast.success('History 등록되었습니다.');
    insertHistory(params);
  };
  const handleDeleteHistory = async (params: HistoryDeleteParma) => {
    await deleteHistory(params);
    queryClient.invalidateQueries(['history']);
    toast.success('History 삭제되었습니다.');
  };

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return isNaN(date.getTime()) ? '-' : date.toLocaleDateString();
  };

  return {
    historyList: getHistoryList || [],
    insertHistory: handleInsertHistory,
    deleteHistory: handleDeleteHistory,
    formatDate,
  };
};

export default useHistory;
