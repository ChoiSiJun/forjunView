import { AxiosError } from 'axios';
import { useMutationWithLoading } from '../../config/hooks/useMutationWithLoading';
import { useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import axios from '@api/config/axios/axios';

const useHistoryDeleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutationWithLoading<void, AxiosError, number>({
    mutationFn: async (id: number) => {
      await axios.delete<void>(
        import.meta.env.VITE_REST_API + '/history/' + id,
      );
    },

    onSuccess: () => {
      queryClient.invalidateQueries(['history']);
      toast.success('History 삭제되었습니다.');
    },
  });
};

export default useHistoryDeleteMutation;
