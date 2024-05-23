import Grid from '@mui/material/Grid';
import CardLayout from '@template/CardLayout';
import MirTextField from '@common/components/atoms/input/MirTextField';
import { useRef } from 'react';

export default function TemplateInput() {
  const inputRef = useRef(null);
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} minWidth={600} height={500}>
        <CardLayout
          component={
            <MirTextField
              textFieldType={'outlined-basic'}
              label={'텍스트필드'}
              InputRef={inputRef}
            />
          }
          title={'텍스트필드'}
          note={[
            'textFieldType: 텍스트 필드 타입 ( outlined-basic ,filled-basic, standard-basic)',
            'label: 텍스트 필드 라벨값',
            'InputRef : 텍스트 필드에 연결될 Ref값',
          ]}
          copyCode={'<ExportButton buttonName={} onClick={}></ExportButton>'}
        ></CardLayout>
      </Grid>
    </Grid>
  );
}
