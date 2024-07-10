import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import MirValidTextField from '@common/components/atoms/input/MirValidTextField';
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import MirButton from '@common/components/atoms/button/MirButton';

type FormValues = {
  "mloc": string;
  "name_ko": string;
};

const LocationUpdateModal = () => {

  const { handleSubmit, formState, control } = useForm<FormValues> ({
    defaultValues: {
      mloc: "",
      name_ko: "",
    }
  });
  const { errors } = formState;

  const onSubmit = (data: FormValues) => {
    alert(JSON.stringify(data));
  };

  return (
    <Box sx={{ p: 1 }}>
    
    <Box>
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
    </Box>

      <Divider />
      <Box sx={{ p: 1 }}>
        <MirButton ButtonType="default" buttonName="닫기" />
      </Box>
    </Box>
  );
};

export default LocationUpdateModal;