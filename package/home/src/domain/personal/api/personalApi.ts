import { defineEndpoint } from '@common/type/ApiEndPoint';
import { Personal } from '../Personal';

const apiBase = '/personal';

export interface PersonalSaveRequest extends Personal {}
export interface PersonalDetailResponse extends Personal {}

export const PERSONAL_API_ENDPOINTS = {
  //자기 소개서 저장
  save: defineEndpoint<PersonalSaveRequest, void>({
    url: apiBase,
    method: 'POST',
  }),
};
