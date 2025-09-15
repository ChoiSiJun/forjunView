import axios from '@api/config/axios/axios';
import { useMutationWithLoading } from '@api/config/hooks/useMutationWithLoading';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

interface JoinParams {
  userId: string;
  password: string;
  userName: string;
  email: string;
}

export const useJoinMutation = (handleJoin: () => void) => {
  return useMutationWithLoading<void, AxiosError, JoinParams>({
    mutationFn: async (params: JoinParams) => {
      await axios.post<void>(import.meta.env.VITE_REST_API + '/user', params, {
        timeout: 5000,
      });
    },

    onSuccess: () => {
      toast.success('가입 되었습니다.');
      handleJoin();
    },
  });
};
