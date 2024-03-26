import {
  MainModal,
  LabelWithInput,
  ButtonComponent,
} from '@common_components_ui';

import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
import { MemberGenerate, closeModal } from '@module/member/slice/MemberSlice';

import { useRef } from 'react';

const MemberUpdateModal = () => {
  //버튼 연결 Ref
  const memberIdInputRef = useRef<HTMLInputElement>(null);
  const memberWebIdInputRef = useRef<HTMLInputElement>(null);
  const memberNameInputRef = useRef<HTMLInputElement>(null);
  const loginPasswordInputRef = useRef<HTMLInputElement>(null);

  //멤버 생성 핸들러 - 리덕스 디스패치
  const dispatch = useAppDispatch();
  const HandleMemberUpdate = () => {
    dispatch(
      MemberGenerate({
        memberId: memberIdInputRef.current?.value || '',
        memberWebId: memberWebIdInputRef.current?.value || '',
        loginPassword: loginPasswordInputRef.current?.value || '',
        memberName: memberNameInputRef.current?.value || '',
      }),
    );
  };

  //Member Update Modal set
  const MemberUpdateModal = useAppSelector(state => state.Member.modal);

  //Member Modal Close
  const HandleModalClose = () => dispatch(closeModal());

  return (
    <MainModal
      title="멤버생성 모달"
      show={MemberUpdateModal}
      buttonList={[
        <ButtonComponent.UpdateButton
          key="save"
          buttonName="저장"
          onClick={HandleMemberUpdate}
        />,
        <ButtonComponent.UpdateButton
          key="close"
          buttonName="닫기"
          onClick={HandleModalClose}
        />,
      ]}
      handleClose={HandleModalClose}
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

export default MemberUpdateModal;
