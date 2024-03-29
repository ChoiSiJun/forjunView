// Container 컴포넌트
import { default as RootContainer } from '@common_components/Container/RootContainer';
import { default as SubContainer } from '@common_components/Container/SubContainer';
import { default as ButtonContainer } from '@common_components/Container/ButtonContainer';

export const MirContainer = {
  RootContainer,
  SubContainer,
  ButtonContainer,
};

// button 컴포넌트
import { default as CreateButton } from '@common_components/Button/CreateButton';
import { default as UpdateButton } from '@common_components/Button/UpdateButton';
import { default as DeleteButton } from '@common_components/Button/DeleteButton';
import { default as ReadButton } from '@common_components/Button/ReadButton';
import { default as ConfirmButton } from '@common_components/Button/ConfirmButton';
import { default as CancelButton } from '@common_components/Button/CancelButton';
import { default as CustomButton } from '@common_components/Button/CustomButton';

export const MirButton = {
  CreateButton,
  UpdateButton,
  DeleteButton,
  ReadButton,
  ConfirmButton,
  CancelButton,
  CustomButton,
};

// Modal 컴포넌트
import { default as MainModal } from '@common_components/Modal/MainModal';
export const MirModal = {
  MainModal,
};

//FormControl 컴포넌트
export { default as InputFormControl } from '@common_components/FormControl/InputFormControl';
export { default as LabelWithInput } from '@common_components/FormControl/ui/LabelWithInput';

//Table 컴포넌트
export { default as BasicTable } from '@common_components/Table/BasicTable';

//Toast 컴포넌트
export { default as ReactToast } from '@common_components/Toasts/ReactToast';
