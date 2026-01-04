import { useState, useMemo } from 'react';
import { useQueryClient } from 'react-query';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useJoinUserMutation } from '@domain/user/api/useJoinUserMutation';
import { useLoginUserMutation } from '@domain/user/api/useLoginUserMutation';
import { fetchIdDuplicateCheck } from '@domain/user/api/useDuplicateIdCheckUserQuery';
import useUserQuery from '@domain/user/api/useUserQuery';
import { useUpdateUserMutation } from '@domain/user/api/useUpdateUserMutation';
import { USER_API_ENDPOINTS } from '@domain/user/api/userApi';
import { UserDetailResponse } from '@domain/user/api/userApi';
import { GetRequestType } from '@common/utill/type-utils';
import { toast } from 'react-toastify';
import { useAppDispatch } from '@store/ReduxHooks';
import { authInsert } from '@store/slice/AuthSlice';

export interface UserInfoFormValues {
  userName: string;
  email: string;
  historyPrivate: string;
  personalPrivate: string;
}

const FormValuesConvert = (userData: UserDetailResponse | undefined): UserInfoFormValues => {
  if (!userData) {
    return {
      userName: '',
      email: '',
      historyPrivate: 'PUBLIC',
      personalPrivate: 'PUBLIC',
    } as UserInfoFormValues;
  }

  return {
    userName: userData.userName || '',
    email: userData.email || '',
    historyPrivate: userData.historyPrivate || 'PUBLIC',
    personalPrivate: userData.personalPrivate || 'PUBLIC',
  } as UserInfoFormValues;
};

const useUser = () => {
  /** Types */
  type JoinUserRequest = GetRequestType<typeof USER_API_ENDPOINTS.join>;
  type LoginUserRequest = GetRequestType<typeof USER_API_ENDPOINTS.login>;
  type DuplicateIdCheckUserRequest = GetRequestType<typeof USER_API_ENDPOINTS.duplicateCheckId>;

  /** Mutation & Query */
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  /** 회원가입 뮤테이션 */
  const joinMutation = useJoinUserMutation();

  /** 로그인 뮤테이션 */
  const loginMutation = useLoginUserMutation();

  /** 사용자 정보 조회 */
  const userData = useUserQuery().data;

  /** 사용자 정보 수정 뮤테이션 */
  const { mutateAsync: updateUserMutation } = useUpdateUserMutation();

  /** 아이디 중복 체크 진행중 상태 */
  const [isDuplicateIdChecking, setIsDuplicateIdChecking] = useState(false);

  /** 아이디 중복 체크 결과 상태 */
  const [isIdAvailable, setIsIdAvailable] = useState<boolean | null>(null);

  /** 회원가입 핸들러 */
  const handleJoin = async (params: JoinUserRequest, onSuccess?: () => void) => {
    await joinMutation.mutateAsync(params);
    toast.success('가입 되었습니다.');
    onSuccess?.();
  };

  /** 로그인 핸들러 */
  const handleLogin = async (params: LoginUserRequest) => {
    const token = await loginMutation.mutateAsync(params);
    dispatch(authInsert(token));
    toast.success('로그인 되었습니다.');
  };

  /** 아이디 중복 체크 핸들러 */
  const handleDuplicateIdCheck = async (params: DuplicateIdCheckUserRequest) => {
    if (!params.userId) {
      toast.error('아이디를 입력해주세요.');
      return;
    }

    if (isDuplicateIdChecking) {
      toast.error('이미 중복 체크를 진행중입니다.');
      return;
    }

    setIsDuplicateIdChecking(true);
    try {
      const data = await fetchIdDuplicateCheck(params.userId);

      if (typeof data === 'boolean') {
        if (data) {
          toast.error('중복된 아이디가 존재합니다');
        } else {
          toast.success('가입 가능한 아이디입니다.');
        }
        setIsIdAvailable(!data);
      }
      return false;
    } finally {
      setIsDuplicateIdChecking(false);
    }
  };

  /** 사용자 정보 Form 데이터 변환 */
  const loadedData = useMemo(() => {
    return FormValuesConvert(userData);
  }, [userData]);

  /** 사용자 정보 수정 Form */
  const userInfoFormik = useFormik<UserInfoFormValues>({
    initialValues: loadedData,
    enableReinitialize: true,
    validationSchema: Yup.object({
      userName: Yup.string().required('이름은 필수 항목입니다.'),
      email: Yup.string().email('이메일 형식이 아닙니다.').required('이메일은 필수 항목입니다.'),
      historyPrivate: Yup.string().required('히스토리 공개 설정은 필수 항목입니다.'),
      personalPrivate: Yup.string().required('자기소개서 공개 설정은 필수 항목입니다.'),
    }),
    onSubmit: async values => {
      try {
        await updateUserMutation(values);
        queryClient.invalidateQueries(['user']);
        toast.success('개인정보가 수정되었습니다.');
      } catch (error) {
        // 에러는 mutation에서 처리됨
      }
    },
  });

  return {
    join: handleJoin,
    login: handleLogin,
    duplicateIdCheck: handleDuplicateIdCheck,
    isDuplicateIdChecking,
    isIdAvailable,
    setIsIdAvailable,
    joinMutation,
    loginMutation,
    userInfoFormik,
  };
};

export default useUser;
