import { defineEndpoint } from '@common/type/ApiEndPoint';
import { History } from '@domain/history/History';

const apiBase = '/history';

export interface HistorySaveRequest extends Omit<History, 'id'> {}
export interface HistoryDeleteRequest extends Pick<History, 'id'> {}

export interface HistoryListRequest extends Pick<History, 'category'> {}
export interface HistoryListResponse extends History {}

export const HISTORY_API_ENDPOINTS = {
  //히스토리 저장
  save: defineEndpoint<HistorySaveRequest, void>({
    url: apiBase,
    method: 'POST',
  }),

  //히스토리 삭제
  delete: defineEndpoint<HistoryDeleteRequest, void>({
    url: apiBase,
    method: 'DELETE',
  }),

  //히스토리 리스트 정보가져오기
  get: defineEndpoint<HistoryListRequest, HistoryListResponse>({
    url: apiBase + '/list',
    method: 'GET',
  }),
};
