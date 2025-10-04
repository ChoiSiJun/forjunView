import axios from '@config/axios/axios';
import { useMutationWithLoading } from '@config/hooks/useMutationWithLoading';
import { AxiosError } from 'axios';
import { PERSONAL_API_ENDPOINTS } from './personalApi';
import { GetRequestType, GetResponseType } from '@common/utill/type-utils';

const END_POINT = PERSONAL_API_ENDPOINTS.save;

type UploadReq = GetRequestType<typeof END_POINT>;
type UploadRes = GetResponseType<typeof END_POINT>;

const usePersonaSaveMutation = () => {
  return useMutationWithLoading<UploadRes, AxiosError, UploadReq>({
    mutationFn: async params => {
      await axios({
        method: END_POINT.method,
        url: END_POINT.url,
        data: params,
      });
    },
  });
};

export default usePersonaSaveMutation;
