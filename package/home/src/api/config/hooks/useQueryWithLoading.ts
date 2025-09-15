// hooks/useQueryWithLoading.ts
import { useQuery, UseQueryOptions, UseQueryResult } from 'react-query';
import { useAppDispatch } from 'store/ReduxHooks';
import { lodingOn, lodingOff } from '@store/slice/loadingSlice';
import apiErrorHandler from '@api/config/handlers/apiErrorHandler';
import { useEffect } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const useQueryWithLoading = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = unknown[],
>(
  options: UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): UseQueryResult<TData, TError> => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const queryResult = useQuery({
    ...options,

    retry: (failureCount, error) => {
      if (
        error instanceof AxiosError &&
        [401, 403].includes(error.response?.status ?? 0)
      ) {
        return false;
      }

      return failureCount < 3; // 기본 3회 재시도
    },

    onError: error => {
      dispatch(lodingOff());

      if (
        error instanceof AxiosError &&
        [403].includes(error.response?.status ?? 0)
      ) {
        navigate('/error');
        return false;
      }

      if (
        error instanceof AxiosError &&
        [401].includes(error.response?.status ?? 0)
      ) {
        navigate('/');
        return false;
      }

      if (options.onError) {
        options.onError(error);
      } else {
        apiErrorHandler(error);
      }
    },

    onSuccess: data => {
      dispatch(lodingOff());
      options.onSuccess?.(data);
    },

    onSettled: (data, error) => {
      dispatch(lodingOff());
      options.onSettled?.(data, error);
    },
  });

  useEffect(() => {
    if (queryResult.isFetching) {
      dispatch(lodingOn());
    }
  }, [queryResult.isFetching, dispatch]);

  return queryResult;
};
