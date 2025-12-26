import SjSelectBox from '@common/ui/elements/input/SjSelectBox';
import SjTextField from '@common/ui/elements/input/SjTextField';
import SjDatePicker from '@common/ui/modules/SjDatePicker';
import SjInputList from '@common/ui/modules/SjInputList';
import { Box, Button, Grid } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useFormik } from 'formik';
import { useCallback, useState } from 'react';
import * as Yup from 'yup';
import { HISTORY_API_ENDPOINTS } from '@domain/history/api/HistoryApi';
import { GetRequestType } from '@common/utill/type-utils';
import BoardEditor from '@common/ui/template/BoardEditor';

type HistorySaveParma = GetRequestType<typeof HISTORY_API_ENDPOINTS.save>;

interface RegisterParams {
  onClick: (params: HistorySaveParma) => void;
  catagory: 'SI' | 'SM' | 'RND';
}

const Register = ({ onClick, catagory }: RegisterParams) => {
  /** 상태 */
  const [description, setDescription] = useState<string>('');

  /** Hook */
  const registerForm = useFormik<HistorySaveParma>({
    initialValues: {
      category: catagory,
      project: '',
      subject: '',
      description: '',
      historyStartDate: '',
      historyEndDate: '',
      historySkill: [],
    },

    validationSchema: Yup.object({
      category: Yup.string().required('유형선택은 필수입니다.'),
      project: Yup.string().required('프로젝트명은 필수입니다.'),
    }),

    onSubmit: async values => {
      values.description = description;
      onClick(values);
    },
  });

  const { setFieldValue } = registerForm;

  const onChangeStartDate = (value: Dayjs | null) => {
    const historyStartDate = value?.format('YYYY-MM-DD');
    setFieldValue('historyStartDate', historyStartDate);
  };

  const onChangeEndDate = (value: Dayjs | null) => {
    const historyEndDate = value?.format('YYYY-MM-DD');
    setFieldValue('historyEndDate', historyEndDate);
  };

  const skillList = useCallback(
    (valueList: string[]) => {
      setFieldValue('historySkill', valueList);
    },
    [setFieldValue],
  );

  return (
    <Box component="form" noValidate onSubmit={registerForm.handleSubmit}>
      <Grid container component="main" sx={{ height: '80vh' }}>
        <Grid item xs={12} sm={12} md={12} margin={1}>
          <SjSelectBox
            menuItem={[
              { name: 'SI', value: 'SI' },
              { name: 'SM', value: 'SM' },
              { name: 'RND', value: 'RND' },
            ]}
            defaultValue={registerForm.values.category}
            label={'유형'}
            name={'category'}
            onChange={registerForm.handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} margin={1}>
          <SjTextField label={'프로젝트'} name={'project'} onChange={registerForm.handleChange} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} margin={1}>
          <SjTextField label={'주제'} name={'subject'} onChange={registerForm.handleChange} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} margin={1}>
          <SjDatePicker label={'시작날짜'} onDateChange={onChangeStartDate} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} margin={1}>
          <SjDatePicker label={'종료날짜'} onDateChange={onChangeEndDate} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} margin={1}>
          <SjInputList label={'SKill'} name={'skill'} listHeight={90} onChangeList={skillList} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} margin={1}>
          <BoardEditor value={description} setValue={setDescription} directory={'history'} />
        </Grid>

        <Grid item xs={12} sm={12} md={12} margin={1}>
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            등록
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Register;
