import { AxiosError } from 'axios';
import { useMutationWithLoading } from '../../config/hooks/useMutationWithLoading';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@store/ReduxHooks';
import { modalClose } from '@store/slice/ModalSlice';
import axios from '@api/config/axios/axios';

export interface HistoryInsertParma {
  category: string;
  project: string;
  subject: string;
  description: string;
  historySkill: string[];
  historyStartDate: string;
  historyEndDate: string;
}

const useHistoryInsertMutation = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();

  return useMutationWithLoading<void, AxiosError, HistoryInsertParma>({
    mutationFn: async (params: HistoryInsertParma) => {
      await axios.post<void>(
        import.meta.env.VITE_REST_API + '/history',
        params,
        {
          timeout: 5000,
        },
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['history']);
      toast.success('History 등록되었습니다.');
      dispatch(modalClose());
    },
  });
};

export default useHistoryInsertMutation;
