//사용할 필드 타입
export interface FieldListType {
  order: number;
  key: string;
  name: string;
}

//AsyncThunk 비동기 처리에 대한 에러코드 타입
export interface AsyncThunkErrorType {
  errorMessage: string;
}
