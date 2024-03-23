import {
  RootContainer,
  SubContainer,
  ButtonComponent,
} from '@common_components_ui';
import MembetList from '@module/member/components/MemberList';
import { useState } from 'react';
import MemberCreateModal from '../components/MemberCreateModal';

function MembetMain() {
  //멤버생성 모달창 제어 핸들러
  const [createModal, setcreateModal] = useState(false);
  const CreateModalClose = () => setcreateModal(false);
  const CreateModalShow = () => setcreateModal(true);

  return (
    <RootContainer>
      <MembetList />
      <MemberCreateModal
        show={createModal}
        handleClose={CreateModalClose}
      ></MemberCreateModal>

      <SubContainer>
        <ButtonComponent.CreateButton
          buttonName="신규"
          onClick={CreateModalShow}
        />
      </SubContainer>
    </RootContainer>
  );
}

export default MembetMain;
