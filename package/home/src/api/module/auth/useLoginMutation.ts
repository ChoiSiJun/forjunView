import axios from '@api/config/axios/axios';
import { useMutationWithLoading } from '@api/config/hooks/useMutationWithLoading';
import { useAppDispatch } from '@store/ReduxHooks';
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';
import { authInsert } from 'store/slice/AuthSlice';

interface LoginParams {
  userId: string;
  password: string;
}

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();
  return useMutationWithLoading<string, AxiosError, LoginParams>({
    mutationFn: async (params: LoginParams) => {
      const response = await axios.post<string>(
        import.meta.env.VITE_REST_API + '/user/login',
        params,
      );
      return response.data;
    },

    onSuccess: token => {
      dispatch(authInsert(token));
      toast.success('로그인 되었습니다.');
    },
  });
};
