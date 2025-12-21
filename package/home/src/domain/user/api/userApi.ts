import { defineEndpoint } from '@common/type/ApiEndPoint';
import { User } from '@domain/user/user';

//API Base
const userApiBase = '/user';

//API request type
export interface DuplicateIdCheckUserRequest extends Pick<User, 'userId'> {}
export interface JoinUserRequest extends Pick<User, 'userId' | 'password' | 'userName' | 'email'> {}
export interface LoginUserRequest extends Pick<User, 'userId' | 'password'> {}

//API endpoints
export const USER_API_ENDPOINTS = {
  //ID 중복 체크
  duplicateCheckId: defineEndpoint<DuplicateIdCheckUserRequest, void>({
    url: '/api/v1' + userApiBase + '/duplicate',
    method: 'GET',
  }),

  //회원가입
  join: defineEndpoint<JoinUserRequest, void>({
    url: '/api/v1' + userApiBase,
    method: 'POST',
  }),

  //로그인
  login: defineEndpoint<LoginUserRequest, string>({
    url: '/api/v1' + userApiBase + '/login',
    method: 'POST',
  }),
};
