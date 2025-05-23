import { useMutationWithLoading } from '@api/hooks/useMutationWithLoading';
import { useAppDispatch } from '@store/ReduxHooks';
import axios, { AxiosError } from 'axios';
import { authInsert } from 'store/slice/AuthSlice';

interface LoginParams {
  loginId: string;
  loginPassword: string;
}

interface LoginResponse {
  token: string;
}

export const useLoginMutation = () => {
  const dispatch = useAppDispatch();
  return useMutationWithLoading<LoginResponse, AxiosError, LoginParams>({
    mutationFn: async (params: LoginParams) => {
      const response = await axios.post<LoginResponse>(
        import.meta.env.VITE_REST_API + '/user/login',
        params,
        {
          timeout: 5000,
        },
      );
      return response.data;
    },

    onSuccess: ({ token }: LoginResponse) => {
      dispatch(authInsert(token));
      location.href = '/forjun';
    },
  });
};
