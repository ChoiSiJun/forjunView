import axios from '@api/config/axios/axios';
import apiErrorHandler from '@api/config/handlers/apiErrorHandler';

export const idDuplicateCheck = async (
  userId: string,
): Promise<true | false | 'error'> => {
  try {
    const response = await axios.get<boolean>(
      import.meta.env.VITE_REST_API + '/user/duplicate',
      {
        params: { userId },
      },
    );
    return response.data;
  } catch (error) {
    apiErrorHandler(error);
    return 'error';
  }
};
