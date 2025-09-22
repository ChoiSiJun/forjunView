import axios from '@config/axios/axios';
import { useMutationWithLoading } from '@config/hooks/useMutationWithLoading';
import { AxiosError } from 'axios';
import { USER_API_ENDPOINTS } from './authApi';

interface LoginParams {
  userId: string;
  password: string;
}

export const useLoginMutation = () => {
  const endpoint = USER_API_ENDPOINTS.login;
  return useMutationWithLoading<string, AxiosError, LoginParams>({
    mutationFn: async (params: LoginParams) => {
      const response = await axios({
        url: endpoint.url,
        method: endpoint.method,
        data: params,
        timeout: 5000,
      });
      return response.data;
    },
  });
};
