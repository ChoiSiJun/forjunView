import axios from '@config/axios/axios';
import { useMutationWithLoading } from '@config/hooks/useMutationWithLoading';
import { AxiosError } from 'axios';
import { PersonalParams } from '@domain/personal/types';
import { PERSONAL_API_ENDPOINTS } from './personalApi';

const usePersonaSaveMutation = () => {
  return useMutationWithLoading<void, AxiosError, PersonalParams>({
    mutationFn: async (params: PersonalParams) => {
      const endpoint = PERSONAL_API_ENDPOINTS.save;
      await axios({
        method: endpoint.method,
        url: endpoint.url,
        params: { params },
      });
    },
  });
};

export default usePersonaSaveMutation;
