import Grid from '@mui/material/Grid';

import MirModalTitle from '@common/components/atoms/modal/MirModalTitle';
import MirModalContents from '@common/components/atoms/modal/MirModalContents';
import MirModalAction from '@common/components/atoms/modal/MirModalAction';
import MirValidTextField from '@common/components/atoms/input/MirValidTextField';
import MirButton from '@common/components/atoms/button/MirButton';

import UseModal from '@hooks/UseModal';
import { useForm  } from "react-hook-form";
import { IFormValues } from '@module/system/components/manager/InterfaceManager';
import { useCreateManager } from '@module/system/hook/useManagerQuery'

const ManagerCreateModal = () => {
  const { closeModal } = UseModal();

  const {handleSubmit, control} = useForm<IFormValues>({
    defaultValues: {
      userid: "",
      name: "",
      email: "",
      tel: "",
    }
  });

  const { mutate: createManager } = useCreateManager();

  const handleCreateManagers = (data: IFormValues) => {
    createManager(data)
  };

  return (
    <>
      <MirModalTitle
        title="관리자 생성"
        // subTitle={Modal.subTitle}
        closeModal={() => closeModal()}
      />
      <MirModalContents>
        <form onSubmit={handleSubmit(handleCreateManagers)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MirValidTextField
                name="userid"
                control={control}
                rules={{ required: '아이디를 입력하세요.' }}
                textFieldProps={{
                  label: '아이디',
                  id: 'userid',
                  placeholder: '아이디를 입력하세요.',
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MirValidTextField
                name="name"
                control={control}
                rules={{ required: '이름을 입력하세요.' }}
                textFieldProps={{
                  label: '이름',
                  id: 'name',
                  placeholder: '이름을 입력하세요.',
                  required: true,
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MirValidTextField
                name="email"
                control={control}
                rules={{
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i,
                    message: '이메일 형식에 맞지 않습니다.',
                  },
                }}
                textFieldProps={{
                  label: '이메일',
                  id: 'email',
                  placeholder: '이메일을 입력하세요.',
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MirValidTextField
                name="tel"
                control={control}
                textFieldProps={{
                  label: '전화번호',
                  id: 'tel',
                  placeholder: '전화번호를 입력하세요.',
                }}
              />
            </Grid>
          </Grid>
        </form>
      </MirModalContents>

      <MirModalAction>
        <MirButton
          ButtonType="default"
          buttonName="저장"
          onClick={handleSubmit(handleCreateManagers)}
        />
        <MirButton
          ButtonType="default"
          buttonName="닫기"
          onClick={() => closeModal()}
        />
      </MirModalAction>
    </>
  );
};

export default ManagerCreateModal;
