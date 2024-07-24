import Grid from '@mui/material/Grid';
import MirValidTextField from '@common/components/atoms/input/MirValidTextField';
import { useForm  } from "react-hook-form";
import { useAppDispatch } from '@config/ReduxHooks';
import MirButton from '@common/components/atoms/button/MirButton';

import MirModalTitle from '@common/components/atoms/modal/MirModalTitle';
import MirModalContents from '@common/components/atoms/modal/MirModalContents';
import MirModalAction from '@common/components/atoms/modal/MirModalAction';
import UseModal from '@hooks/UseModal'; 
import { useCreateLocation } from '@module/system/hook/useLocationQuery'


export interface FormValues {
  "mloc": string;
  "name_ko": string;
  "zipcode": string;
  "address": string;
  "addressDetail": string,
  "email": string,
  "tel": string
};

const LocationCreateModal = () => {
  const { closeModal } = UseModal(); 
  const { handleSubmit, control, reset } = useForm<FormValues> ({
    defaultValues: {
      mloc: "",
      name_ko: "",
      zipcode: "",
      address: "",
      addressDetail: "",
      email: "",
      tel: ""
    }
  });

  const { mutate: createLocation } = useCreateLocation();

  const handleCreateLocations = (data: FormValues) => {
    createLocation(data)
  };

  return (
    <>
      <MirModalTitle
        title="기관코드 생성"
        // subTitle={Modal.subTitle}
        closeModal={() => closeModal()}
      />
      <MirModalContents>
        <form onSubmit={handleSubmit(handleCreateLocations)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MirValidTextField 
                name="mloc"
                control={control}
                rules={{ required: "기관코드를 입력하세요." }}
                textFieldProps={{
                  label: "기관코드",
                  id: "mloc",
                  placeholder: "기관코드를 입력하세요." ,
                  required: true
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MirValidTextField 
                name="name_ko"
                control={control}
                rules={{ required: "기관명칭을 입력하세요." }}
                textFieldProps={{
                  label: "기관명칭",
                  id: "name_ko",
                  placeholder: "기관명칭을 입력하세요.",
                  required: true
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MirValidTextField 
                name="zipcode"
                control={control}
                // rules={{ required: "우편변호를 입력하세요." }}
                textFieldProps={{
                  label: "우편변호",
                  id: "zipcode",
                  placeholder: "우편변호를 입력하세요." 
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <MirValidTextField 
                name="address"
                control={control}
                // rules={{ required: "주소를 입력하세요." }}
                textFieldProps={{
                  label: "주소",
                  id: "address",
                  placeholder: "주소를 입력하세요.", 
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <MirValidTextField 
                name="addressDetail"
                control={control}
                // rules={{ required: "주소를 입력하세요." }}
                textFieldProps={{
                  label: "상세주소",
                  id: "addressDetail",
                  placeholder: "상세주소를 입력하세요." 
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
                    message: "이메일 형식에 맞지 않습니다.",
                  },
                 }}
                textFieldProps={{
                  label: "이메일",
                  id: "email",
                  placeholder: "이메일을 입력하세요." 
                }}
              />
            </Grid>
            <Grid item xs={6}>
              <MirValidTextField 
                name="tel"
                control={control}
                // rules={{ required: "주소를 입력하세요." }}
                textFieldProps={{
                  label: "전화번호",
                  id: "tel",
                  placeholder: "전화번호를 입력하세요." 
                }}
              />
            </Grid>
          </Grid>
        </form>
      </MirModalContents>
      
      <MirModalAction>
        <MirButton ButtonType="default" buttonName="저장" onClick={handleSubmit(handleCreateLocations)} />
        <MirButton ButtonType="default" buttonName="닫기" onClick={() => closeModal()} />
      </MirModalAction>
    </>     
  );
}

export default LocationCreateModal;