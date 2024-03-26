import {
  RootContainer,
  SubContainer,
  ButtonComponent,
} from '@common_components_ui';
import MembetList from '@module/member/components/MemberList';
import { useState } from 'react';
import MemberCreateModal from '../components/MemberCreateModal';
import MemberUpdateModal from '../components/MemberUpdateModal';

function MembetMain() {
  //멤버생성 모달창 제어 핸들러
  const [createModal, setcreateModal] = useState(false);
  const CreateModalClose = () => setcreateModal(false);
  const CreateModalShow = () => setcreateModal(true);

  //멤버 수정창 제어핸들러

  return (
    <RootContainer>
      <MembetList />

      <SubContainer>
        <ButtonComponent.CreateButton
          buttonName="신규"
          onClick={CreateModalShow}
        />
      </SubContainer>

      <MemberCreateModal
        show={createModal}
        handleClose={CreateModalClose}
      ></MemberCreateModal>

      <MemberUpdateModal />
    </RootContainer>
  );
}

export default MembetMain;
