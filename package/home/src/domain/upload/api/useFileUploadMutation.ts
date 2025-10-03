import { useMutationWithLoading } from '@config/hooks/useMutationWithLoading';
import { AxiosError } from 'axios';
import { FILE_UPLOAD_API_ENDPOINTS } from './FileUploadApi';
import axios from '@config/axios/axios';
import { GetRequestType, GetResponseType } from '@common/utill/type-utils';

type UploadReq = GetRequestType<typeof FILE_UPLOAD_API_ENDPOINTS.upload>;
type UploadRes = GetResponseType<typeof FILE_UPLOAD_API_ENDPOINTS.upload>;

//파일 업로드 Mutation
const useFileUploadMutation = () => {
  return useMutationWithLoading<UploadRes, AxiosError, UploadReq>({
    mutationFn: async uploadFile => {
      if (uploadFile == null) {
        throw Error('파일이 비어있습니다.');
      }
      const endpoint = FILE_UPLOAD_API_ENDPOINTS.upload;
      const response = await axios({
        method: endpoint.method,
        url: endpoint.url,
        params: { uploadFile },
      });
      return response.data;
    },
  });
};

export default useFileUploadMutation;
