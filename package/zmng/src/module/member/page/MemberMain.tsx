import { MirContainer, MirButton } from '@common_components_ui';
import MembetList from '@module/member/components/MemberList';
import { useState } from 'react';
import MemberCreateModal from '../components/MemberCreateModal';
import MemberUpdateModal from '../components/MemberUpdateModal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MembetMain() {
  //멤버생성 모달창 제어 핸들러
  const [createModal, setcreateModal] = useState(false);
  const CreateModalClose = () => {
    setcreateModal(false);
    toast('test');
  };

  const CreateModalShow = () => setcreateModal(true);

  //멤버 수정창 제어핸들러

  return (
    <MirContainer.RootContainer>
      {/*멤버리스트*/}
      <MembetList />
      <BasicToast2 />
      <MirContainer.SubContainer>
        <MirButton.CreateButton buttonName="신규" onClick={CreateModalShow} />
      </MirContainer.SubContainer>

      {/*멤버생성모달*/}
      <MemberCreateModal
        show={createModal}
        handleClose={CreateModalClose}
      ></MemberCreateModal>

      {/*멤버수정모달*/}
      <MemberUpdateModal />
      <ToastContainer />
    </MirContainer.RootContainer>
  );
}

export default MembetMain;
