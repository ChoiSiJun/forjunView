import SystemLocationInfo from '@module/system/components/SystemLocationInfo';
import MirTextField, {
  MirTextFieldGuide,
} from '@common/components/atoms/input/MirTextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import FormControl from '@mui/material/FormControl';

const LocationUpdateModal = () => {

  return (
    

    <>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <MirTextField
            textFieldType={'outlined-basic'}
            label={'기관코드'}
            // InputRef={inputRef}
          />
        </Grid>
        <Grid item xs={4}>
          <MirTextField
            textFieldType={'outlined-basic'}
            label={'기관명칭'}
            // InputRef={inputRef}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default LocationUpdateModal;