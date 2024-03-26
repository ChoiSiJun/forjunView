import {
  MainModal,
  LabelWithInput,
  ButtonComponent,
} from '@common_components_ui';

import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
import { MemberUpdate, closeModal } from '@module/member/slice/MemberSlice';

import { useEffect, useRef } from 'react';

const MemberUpdateModal = () => {
  //버튼 연결 Ref
  const memberIdInputRef = useRef<HTMLInputElement>(null);
  const memberWebIdInputRef = useRef<HTMLInputElement>(null);
  const memberNameInputRef = useRef<HTMLInputElement>(null);
  const loginPasswordInputRef = useRef<HTMLInputElement>(null);

  //멤버 수정 핸들러 - 리덕스 디스패치
  const dispatch = useAppDispatch();
  const HandleMemberUpdate = () => {
    dispatch(
      MemberUpdate({
        memberId: memberIdInputRef.current?.value || '',
        memberWebId: memberWebIdInputRef.current?.value || '',
        loginPassword: loginPasswordInputRef.current?.value || '',
        memberName: memberNameInputRef.current?.value || '',
        memberKey: MemberUpdateData.memberInfo.memberKey,
      }),
    );
  };

  //Member Update Modal set
  const MemberUpdateData = useAppSelector(state => state.Member);

  //값 세팅
  useEffect(() => {
    if (memberIdInputRef.current) {
      memberIdInputRef.current.value = MemberUpdateData.memberInfo.memberId;
    }

    if (memberWebIdInputRef.current) {
      memberWebIdInputRef.current.value =
        MemberUpdateData.memberInfo.memberWebId;
    }

    if (memberNameInputRef.current) {
      memberNameInputRef.current.value = MemberUpdateData.memberInfo.memberName;
    }

    if (loginPasswordInputRef.current) {
      loginPasswordInputRef.current.value =
        MemberUpdateData.memberInfo.loginPassword;
    }
  });

  //Member Modal Close
  const HandleModalClose = () => dispatch(closeModal());

  return (
    <MainModal
      title="멤버생성 모달"
      show={MemberUpdateData.modal}
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
