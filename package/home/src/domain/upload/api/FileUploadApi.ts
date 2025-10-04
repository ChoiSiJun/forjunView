import { defineEndpoint } from '@common/type/ApiEndPoint';
import { UploadFile } from '../UploadFile';

export type FileUploadRequest = File | null;
export interface FileUploadResponse extends UploadFile {}

//파일 업로드 관련 API
const apiBase = '/api/system/files';
export const FILE_UPLOAD_API_ENDPOINTS = {
  //파일 업로드
  upload: defineEndpoint<FileUploadRequest, FileUploadResponse>({
    url: apiBase + '/upload',
    method: 'POST',
  }),

  //파일 삭제
  delete: defineEndpoint<string, { success: boolean }>({
    url: `${apiBase}/:fileId`,
    method: 'DELETE',
  }),
};
