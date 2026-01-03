// hooks/useMutationWithLoading.ts
import { useMutation, UseMutationOptions, UseMutationResult } from 'react-query';
import { useAppDispatch } from 'store/ReduxHooks';
import { mutationLoadingOn, mutationLoadingOff } from '@store/slice/LoadingSlice';
import apiErrorHandler from '@config/handlers/apiErrorHandler';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

export const useMutationWithLoading = <TData = unknown, TError = unknown, TVariables = void>(
  options?: UseMutationOptions<TData, TError, TVariables>, // options를 optional로
): UseMutationResult<TData, TError, TVariables> => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return useMutation<TData, TError, TVariables>({
    ...(options ?? {}),
    onMutate: async variables => {
      dispatch(mutationLoadingOn());
      if (options?.onMutate) {
        return await options.onMutate(variables);
      }
    },
    retry:
      options?.retry ??
      ((failureCount, error) => {
        if (error instanceof AxiosError && [401, 403, 404].includes(error.response?.status ?? 0)) {
          return false;
        }

        return failureCount < 3; // 기본 3회 재시도
      }),
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (options?.onError) {
        if (error instanceof AxiosError && [403].includes(error.response?.status ?? 0)) {
          navigate('/error');
          return false;
        }

        if (error instanceof AxiosError && [401].includes(error.response?.status ?? 0)) {
          navigate('/');
          return false;
        }
        options.onError(error, variables, context);
      } else if (error) {
        apiErrorHandler(error);
      }
    },
    onSettled: (data, error, variables, context) => {
      dispatch(mutationLoadingOff());
      if (options?.onSettled) {
        options.onSettled(data, error, variables, context);
      }
    },
  } as UseMutationOptions<TData, TError, TVariables>);
};
