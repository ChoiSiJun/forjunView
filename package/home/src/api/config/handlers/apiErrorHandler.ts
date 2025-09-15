// @hooks/apiErrorHandler.ts
import { AxiosError } from 'axios';
import { toast } from 'react-toastify';

const apiErrorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error.message;
    if (error.response?.status == 401) {
      location.href = '/';
    }
    toast.error(message);
    return;
  } else {
    toast.error('예상치 못한 오류가 발생했습니다.');
  }
};

export default apiErrorHandler;
