//AsyncThunk 비동기 처리에 대한 에러코드 타입
export interface AsyncThunkErrorProps {
  errorMessage: string;
  errorCode: number | undefined;
}

//공통 버튼 타입
export interface ButtonProps {
  buttonName?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
