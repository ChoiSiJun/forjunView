import Grid from '@mui/material/Grid';
import MirValidTextField from '@common/components/atoms/input/MirValidTextField';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import MirButton from '@common/components/atoms/button/MirButton';

import MirModalContainer from '@common/components/atoms/modal/MirModalContainer';
import MirModalTitle from '@common/components/atoms/modal/MirModalTitle';
import MirModalContents from '@common/components/atoms/modal/MirModalContents';
import MirModalAction from '@common/components/atoms/modal/MirModalAction';

export interface FormValues {
  "mloc": string;
  "name_ko": string;
};

export interface MirModalProps {
  title: string;
  subTitle?: string;
  isOpen: boolean;
  modalSize?: 'sm' | 'md' | 'lg' | 'xl';
  closeModal?: () => void;
}

const testFunction = () =>  {
  alert("test")
}

const LocationCreateModal = ({
  title,
  subTitle,
  modalSize,
  isOpen,
  closeModal,
}:MirModalProps) => {

  const { handleSubmit, control } = useForm<FormValues> ({
    defaultValues: {
      mloc: "",
      name_ko: "",
    }
  });

  //const { errors } = formState;

  const onSubmit = (data: FormValues) => {
     alert(JSON.stringify(data));
    closeModal();
  };

  return (
    
    <MirModalContainer modalSize={modalSize} isOpen={isOpen}>
      <MirModalTitle title={title} subTitle={subTitle} closeModal={closeModal} />

      <MirModalContents>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
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
            <Grid item xs={4}>
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
          </Grid>
          <Grid item xs={8}>
            <input type="submit" />
          </Grid>
        </form>
      </MirModalContents>
      
      <MirModalAction>
        <MirButton ButtonType="default" buttonName="저장" onClick={handleSubmit(onSubmit)} />
        <MirButton ButtonType="default" buttonName="닫기" onClick={closeModal} />
      </MirModalAction>
      
    </MirModalContainer>
     
  );
  
}

export default LocationCreateModal;