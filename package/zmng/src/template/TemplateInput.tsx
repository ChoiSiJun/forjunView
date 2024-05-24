import Grid from '@mui/material/Grid';
import CardLayout from '@template/CardLayout';
import MirTextField, {
  MirTextFieldGuide,
} from '@common/components/atoms/input/MirTextField';
import { useRef } from 'react';
import SearchField, {
  MirSearchFieldGuide,
} from '@common/components/atoms/input/MirSearchField';
import MirCheckbox, {
  MirCheckBoxGuide,
} from '@common/components/atoms/input/MirCheckBox';

import MirSwitch, {
  MirSwitchGuide,
} from '@common/components/atoms/input/MirSwitch';
import MirSelectBox, {
  MirSelectBoxGuide,
} from '@common/components/atoms/input/MirSelectBox';

export default function TemplateInput() {
  const inputRef = useRef(null);
  return (
    <Grid container spacing={3}>
      <Grid item xs={6} minWidth={400}>
        <CardLayout
          component={[
            {
              component: (
                <MirTextField
                  textFieldType={'outlined-basic'}
                  label={'텍스트필드'}
                  InputRef={inputRef}
                />
              ),
            },
          ]}
          title={MirTextFieldGuide.title}
          requireNote={MirTextFieldGuide.requireNote}
          optionNote={MirTextFieldGuide.optionNote}
          copyCode={MirTextFieldGuide.code}
        ></CardLayout>
      </Grid>

      <Grid item xs={6} minWidth={400}>
        <CardLayout
          component={[
            {
              component: (
                <SearchField
                  InputRef={inputRef}
                  onClick={function (): void {
                    alert('검색');
                  }}
                  menuOpenClick={function (): void {
                    alert('메뉴오픈');
                  }}
                />
              ),
            },
          ]}
          title={MirSearchFieldGuide.title}
          requireNote={MirSearchFieldGuide.requireNote}
          optionNote={MirSearchFieldGuide.optionNote}
          copyCode={MirSearchFieldGuide.code}
        ></CardLayout>
      </Grid>

      <Grid item xs={6} minWidth={400}>
        <CardLayout
          component={[{ component: <MirCheckbox /> }]}
          title={MirCheckBoxGuide.title}
          requireNote={MirCheckBoxGuide.requireNote}
          optionNote={MirCheckBoxGuide.optionNote}
          copyCode={MirCheckBoxGuide.code}
        ></CardLayout>
      </Grid>

      <Grid item xs={6} minWidth={400}>
        <CardLayout
          component={[
            {
              note: '테스트',
              component: <MirSwitch />,
            },
          ]}
          title={MirSwitchGuide.title}
          requireNote={MirSwitchGuide.requireNote}
          optionNote={MirSwitchGuide.optionNote}
          copyCode={MirSwitchGuide.code}
        ></CardLayout>
      </Grid>

      <Grid item xs={6} minWidth={400}>
        <CardLayout
          component={[
            {
              note: '테스트',
              component: (
                <MirSelectBox
                  menuItem={[
                    { name: 'itme1', value: 'item1' },
                    { name: 'itme2', value: 'item2' },
                    { name: 'itme3', value: 'item3' },
                  ]}
                  defaultValue={'item1'}
                  label={'item1'}
                />
              ),
            },
          ]}
          title={MirSelectBoxGuide.title}
          requireNote={MirSelectBoxGuide.requireNote}
          optionNote={MirSelectBoxGuide.optionNote}
          copyCode={MirSelectBoxGuide.code}
        ></CardLayout>
      </Grid>
    </Grid>
  );
}
