import Grid from '@mui/material/Grid';
import MirValidTextField from '@common/components/atoms/input/MirValidTextField';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useAppSelector, useAppDispatch } from '@config/ReduxHooks';
import MirButton from '@common/components/atoms/button/MirButton';

import MirModalContainer from '@common/components/atoms/modal/MirModalContainer';
import MirModalTitle from '@common/components/atoms/modal/MirModalTitle';
import MirModalContents from '@common/components/atoms/modal/MirModalContents';
import MirModalAction from '@common/components/atoms/modal/MirModalAction';

import { createLocation } from '@module/system/slice/LocationSlice';
import { modalClosed } from '@common/slice/ModalSlice';
import { useSelector } from 'react-redux';

export interface FormValues {
  "mloc": string;
  "name_ko": string;
  "zipcode": string;
  "address": string;
};

export interface MirModalProps {
  title: string;
  subTitle?: string;
  modalSize?: 'sm' | 'md' | 'lg' | 'xl';
}

const LocationCreateModal = ({
  title,
  subTitle,
  modalSize,
}:MirModalProps) => {

  const { handleSubmit, control } = useForm<FormValues> ({
    defaultValues: {
      mloc: "",
      name_ko: "",
      zipcode: "",
      address: "",
    }
  });

  const dispatch = useAppDispatch();
  const modalOpen = useAppSelector((state) => state.Modal)

  const onSubmit = (data: FormValues) => {
    dispatch(createLocation({locationInfo: data, isOpen: false}))
      .then(() => {
        dispatch(modalClosed());
      })
  };

  return (
    <MirModalContainer modalSize={modalSize} isOpen={modalOpen.isOpen}>
      <MirModalTitle title={title} subTitle={subTitle} closeModal={() => dispatch(modalClosed())} />

      <MirModalContents>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <MirValidTextField 
                name="mloc"
                control={control}
                rules={{ required: "기관코드를 입력하세요." }}
                textFieldProps={{
                  label: "기관코드",
                  id: "mloc",
                  placeholder: "기관코드를 입력하세요." 
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
                  placeholder: "기관명칭을 입력하세요." 
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
                  placeholder: "주소를 입력하세요." 
                }}
              />
            </Grid>
          </Grid>
        </form>
      </MirModalContents>
      
      <MirModalAction>
        <MirButton ButtonType="default" buttonName="저장" onClick={handleSubmit(onSubmit)} />
        <MirButton ButtonType="default" buttonName="닫기" onClick={() => dispatch(modalClosed())} />
      </MirModalAction>
      
    </MirModalContainer>
     
  );
  
}

export default LocationCreateModal;