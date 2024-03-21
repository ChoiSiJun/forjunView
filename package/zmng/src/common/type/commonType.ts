import { ReactNode } from 'react';
//사용할 필드 타입
export interface FieldListProps {
  order: number;
  key: string;
  name: string;
  type: 'data' | 'button';
  buttonArray?: Record<string, ReactNode>[];
}

//AsyncThunk 비동기 처리에 대한 에러코드 타입
export interface AsyncThunkErrorProps {
  errorMessage: string;
}

//버튼 타입
export interface ButtonProps {
  buttonType:
    | 'Confirm'
    | 'Delete'
    | 'Read'
    | 'Update'
    | 'Cancel'
    | 'Confirm'
    | 'Custom';
}
