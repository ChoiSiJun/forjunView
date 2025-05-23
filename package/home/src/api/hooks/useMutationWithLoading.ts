// hooks/useMutationWithLoading.ts
import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from 'react-query';
import { useAppDispatch } from 'store/ReduxHooks';
import { lodingOn, lodingOff } from '@store/slice/loadingSlice';

export const useMutationWithLoading = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
>(
  options?: UseMutationOptions<TData, TError, TVariables>, // options를 optional로
): UseMutationResult<TData, TError, TVariables> => {
  const dispatch = useAppDispatch();

  return useMutation({
    ...(options ?? {}), // options가 없으면 빈 객체를 대입
    onMutate: async variables => {
      dispatch(lodingOn());
      if (options?.onMutate) {
        await options.onMutate(variables);
      }
    },
    onSuccess: (data, variables, context) => {
      dispatch(lodingOff());
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      dispatch(lodingOff());
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    onSettled: (data, error, variables, context) => {
      dispatch(lodingOff());
      if (options?.onSettled) {
        options.onSettled(data, error, variables, context);
      }
    },
  });
};
