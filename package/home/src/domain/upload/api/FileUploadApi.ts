import { defineEndpoint } from '@common/type/ApiEndPoint';
import { UploadFile } from '../UploadFile';

export type FileUploadRequest = FormData;
export interface FileUploadResponse extends UploadFile {}

//파일 업로드 관련 API
const authApiBase = '/api/system/files';
export const FILE_UPLOAD_API_ENDPOINTS = {
  //파일 업로드
  upload: defineEndpoint<FileUploadRequest, FileUploadResponse>({
    url: authApiBase,
    method: 'POST',
  }),

  //파일 삭제
  delete: defineEndpoint<string, { success: boolean }>({
    url: `${authApiBase}/:fileId`,
    method: 'DELETE',
  }),
};
