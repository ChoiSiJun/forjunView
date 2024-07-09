import Grid from '@mui/material/Grid';
import MirValidTextField from '@common/components/atoms/input/MirValidTextField';
import { useForm, SubmitHandler, Controller } from "react-hook-form";

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
            name="name"
            control={control}
            rules={{ required: "기관코드를 입력하세요." }}
            textFieldProps={{
              label: "기관코드",
              id: "name",
              placeholder: "기관코드를 입력하세요." 
            }}
          />
        </Grid>
      </Grid>
      <Grid item xs={8}>
        <input type="submit" />
      </Grid>
    </form>
  );
};

export default LocationUpdateModal;