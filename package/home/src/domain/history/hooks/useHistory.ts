import { useDeleteHistoryMutation } from '@domain/history/api/useDeleteHistoryMutation';
import { useInsertHistoryMutation } from '@domain/history/api/useInsertHistoryMutation';
import { useHistoryListQuery } from '@domain/history/api/useHistoyListQuery';
import { HISTORY_API_ENDPOINTS } from '@domain/history/api/HistoryApi';
import { GetRequestType } from '@common/utill/type-utils';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { modalClose } from '@store/slice/ModalSlice';
import { useAppDispatch } from '@store/ReduxHooks';

const useHistory = (category: string) => {
  /** Types */
  type HistorySaveRequest = GetRequestType<typeof HISTORY_API_ENDPOINTS.save>;
  type HistoryDeleteRequest = GetRequestType<typeof HISTORY_API_ENDPOINTS.delete>;

  /** Mutation & Query */
  const queryClient = useQueryClient();
  const getHistoryList = useHistoryListQuery({ category: category }).data;
  const insertHistory = useInsertHistoryMutation().mutateAsync;
  const deleteHistory = useDeleteHistoryMutation().mutateAsync;

  /** Redux */
  const dispatch = useAppDispatch();

  /** 핸들러 */

  /** 등록 핸들러 */
  const handleInsertHistory = async (params: HistorySaveRequest) => {
    await insertHistory(params);
    queryClient.invalidateQueries(['history']);
    toast.success('History 등록되었습니다.');
    dispatch(modalClose());
  };

  /** 삭제 핸들러 */
  const handleDeleteHistory = async (params: HistoryDeleteRequest) => {
    await deleteHistory(params);
    queryClient.invalidateQueries(['history']);
    toast.success('History 삭제되었습니다.');
  };

  /** 날짜 포맷팅 */
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
