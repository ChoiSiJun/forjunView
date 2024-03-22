import {
  MainModal,
  LabelWithInput,
  ButtonComponent,
} from '@common_components_ui';

import { useAppDispatch } from '@config/ReduxHooks';
import { MemberGenerate } from '@module/member/slice/MemberSlice';

import { useRef } from 'react';

interface MemberCreateModalProps {
  show: boolean;
  handleClose: () => void;
}

const MemberCreateModal = ({ show }: MemberCreateModalProps) => {
  //모달창 제어 핸들러
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //버튼 연결 Ref
  const memberIdInputRef = useRef<HTMLInputElement>(null);
  const memberWebIdInputRef = useRef<HTMLInputElement>(null);
  const memberNameInputRef = useRef<HTMLInputElement>(null);
  const loginPasswordInputRef = useRef<HTMLInputElement>(null);

  //멤버 생성 핸들러 - 리덕스 디스패치
  const dispatch = useAppDispatch();
  const handleGenerate = () => {
    dispatch(
      MemberGenerate({
        memberId: memberIdInputRef.current?.value || '',
        memberWebId: memberWebIdInputRef.current?.value || '',
        loginPassword: loginPasswordInputRef.current?.value || '',
        memberName: memberNameInputRef.current?.value || '',
      }),
    );
  };

  return (
    <MainModal
      title="멤버생성 모달"
      show={show}
      buttonList={[
        <ButtonComponent.CreateButton
          key="save"
          buttonName="저장"
          onClick={handleGenerate}
        />,
        <ButtonComponent.CreateButton
          key="close"
          buttonName="닫기"
          onClick={handleClose}
        />,
      ]}
      handleClose={handleClose}
    >
      <LabelWithInput
        type="text"
        label="아이디"
        labelType="row"
        ref={memberIdInputRef}
      />
      <LabelWithInput
        type="text"
        label="로그인 아이디"
        labelType="row"
        ref={memberWebIdInputRef}
      />
      <LabelWithInput
        type="text"
        label="이름"
        labelType="row"
        ref={memberNameInputRef}
      />
      <LabelWithInput
        type="password"
        label="비밀번호"
        labelType="row"
        ref={loginPasswordInputRef}
      />
    </MainModal>
  );
};

export default MemberCreateModal;
