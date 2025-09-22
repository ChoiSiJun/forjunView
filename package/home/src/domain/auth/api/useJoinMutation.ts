import axios from '@config/axios/axios';
import { useMutationWithLoading } from '@config/hooks/useMutationWithLoading';
import { AxiosError } from 'axios';
import { USER_API_ENDPOINTS } from './authApi';

export interface joinMutationParams {
  userId: string;
  password: string;
  userName: string;
  email: string;
}

/**
 * 회원가입 뮤테이션 훅
 * @param {Function} handleJoin - 회원가입 성공 시 호출될 콜백 함수
 */
export const useJoinMutation = () => {
  const endpoint = USER_API_ENDPOINTS.join;

  return useMutationWithLoading<void, AxiosError, joinMutationParams>({
    mutationFn: async (params: joinMutationParams) => {
      // 엔드포인트의 URL과 HTTP 메서드를 사용하도록 수정
      await axios({
        method: endpoint.method,
        url: endpoint.url,
        data: params,
        timeout: 5000,
      });
    },
  });
};
