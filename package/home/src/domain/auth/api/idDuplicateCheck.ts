import axios from '@config/axios/axios';
import apiErrorHandler from '@config/handlers/apiErrorHandler';
import { USER_API_ENDPOINTS } from './authApi';

/**
 *  ID 중복체크 API
 */

export const idDuplicateCheck = async (userId: string): Promise<boolean> => {
  try {
    const endpoint = USER_API_ENDPOINTS.duplicateCheckId;
    const response = await axios({
      method: endpoint.method,
      url: endpoint.url,
      params: { userId },
    });
    return response.data;
  } catch (error) {
    apiErrorHandler(error);
    throw error;
  }
};
