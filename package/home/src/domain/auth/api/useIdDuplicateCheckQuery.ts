import axios from '@config/axios/axios';
import { useQueryWithLoading } from '@config/hooks/useQueryWithLoading';
import { USER_API_ENDPOINTS } from '@domain/auth/api/authApi';

const fetchIdDuplicateCheck = async (userId: string): Promise<boolean> => {
  const endpoint = USER_API_ENDPOINTS.duplicateCheckId;
  const response = await axios({
    method: endpoint.method,
    url: endpoint.url,
    params: { userId },
  });

  return response.data;
};

/**
 * ID 중복 체크 쿼리 훅
 * @param userId - 중복 체크할 사용자 ID
 * @returns 중복 체크 결과
 */
const useIdDuplicateCheckQuery = (userId: string) => {
  return useQueryWithLoading<boolean>({
    queryKey: ['idDuplicateCheck', userId],
    queryFn: () => fetchIdDuplicateCheck(userId),
    enabled: false,
  });
};

export default useIdDuplicateCheckQuery;
