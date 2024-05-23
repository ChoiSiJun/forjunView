import Grid from '@mui/material/Grid';
import CardLayout from '@template/CardLayout';
import TextField from '@common/components/atoms/input/MirTextField';
import { useRef } from 'react';
import SearchField from '@common/components/atoms/input/MirSearchField';
import MirCheckbox from '@common/components/atoms/input/MirCheckBox';

export default function TemplateInput() {
  const MirTextFieldGuide = {
    title: '텍스트 필드',
    code: `const inputRef = useRef(null);
    <TextField textFieldType={'outlined-basic'} label={'텍스트필드'} InputRef={inputRef}/>`,

    note: [
      'textFieldType: 텍스트 필드 타입 ( outlined-basic ,filled-basic, standard-basic)',
      'label: 텍스트 필드 라벨값',
      'InputRef : 텍스트 필드에 연결될 Ref값',
    ],
  };

  const MirSearchFieldGuide = {
    title: '검색 필드',
    code: ` const inputRef = useRef(null);
    <SearchField searchInputRef={inputRef} searchClick={function (): void {alert('검색');}} />`,

    note: [
      'placeholder: placeholder',
      'InputRef : 검색 필드에 연결될 Ref값',
      'onClick : 검색버튼 클릭시 호출 이벤트',
    ],
  };

  const MirCheckBoxGuide = {
    title: '체크박스',
    code: `<MirCheckbox label="라벨값" />`,

    note: [
      'label: 체크박스 라벨',
      'required : 라벨사용시 -> 필수값 체크 표시',
      'defaultChecked : 기본값 체크',
      'disabled : 체크박스 비활성화',
    ],
  };

  const inputRef = useRef(null);
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} minWidth={400}>
        <CardLayout
          component={
            <TextField
              textFieldType={'outlined-basic'}
              label={'텍스트필드'}
              InputRef={inputRef}
            />
          }
          title={MirTextFieldGuide.title}
          note={MirTextFieldGuide.note}
          copyCode={MirTextFieldGuide.code}
        ></CardLayout>
      </Grid>

      <Grid item xs={6} minWidth={400}>
        <CardLayout
          component={
            <SearchField
              InputRef={inputRef}
              onClick={function (): void {
                alert('검색');
              }}
            />
          }
          title={MirTextFieldGuide.title}
          note={MirSearchFieldGuide.note}
          copyCode={MirSearchFieldGuide.code}
        ></CardLayout>
      </Grid>

      <Grid item xs={6} minWidth={400}>
        <CardLayout
          component={<MirCheckbox />}
          component2={<MirCheckbox label="라벨값" />}
          title={'체크박스'}
          note={MirCheckBoxGuide.note}
          copyCode={MirCheckBoxGuide.code}
        ></CardLayout>
      </Grid>
    </Grid>
  );
}
