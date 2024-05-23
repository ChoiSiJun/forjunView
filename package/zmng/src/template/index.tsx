import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import TemplateButton from '@template/TemplateButton';
import TemplateTable from '@template/TemplateTable';
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  ThemeProvider,
} from '@mui/material';
import { appTheme } from '@ui-kit/app/themes/appTheme';
import TemplateModal from '@template/TemplateModal';
import TemplateInput from '@template/TemplateInput';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3, height: 800, width: '97%', overflowY: 'auto' }}>
          <div>{children}</div>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

export default function TemplateGuide() {
  //탭 선택 관리
  const [value, setValue] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  //테마 선택 관리
  const themeList = ['appTheme', '준비중', '준비중'];

  const [themebox, setThemebox] = React.useState(themeList[0]);

  const [themeValue, setThemeValue] = React.useState(appTheme);
  const handleThemeChange = (event: SelectChangeEvent) => {
    if (event.target.value == 'appTheme') {
      setThemeValue(appTheme);
      setThemebox(themeList[0]);
    }
  };

  return (
    <ThemeProvider theme={themeValue}>
      <Box
        sx={{
          flexGrow: 1,
          bgcolor: 'background.paper',
          display: 'flex',
          height: 800,
        }}
      >
        <Box>
          <Box margin={2} textAlign={'center'}>
            <FormControl>
              <InputLabel id="demo-simple-select-label">테마선택</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Theme"
                onChange={handleThemeChange}
                value={themebox}
              >
                <MenuItem value={themeList[0]}>{themeList[0]}</MenuItem>
                <MenuItem value={themeList[1]}>{themeList[1]}</MenuItem>
                <MenuItem value={themeList[2]}>{themeList[2]}</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={value}
            onChange={handleChange}
            aria-label="Vertical tabs example"
            sx={{
              borderRight: 1,
              borderColor: 'divider',
              minWidth: 200,
            }}
          >
            <Tab label="<컴포넌트>" disabled />
            <Tab label="Layout Box" {...a11yProps(1)} />
            <Tab label="Input Box" {...a11yProps(2)} />
            <Tab label="Button" {...a11yProps(3)} />
            <Tab label="Table" {...a11yProps(4)} />
            <Tab label="Modal" {...a11yProps(5)} />
            <Tab label="Input" {...a11yProps(6)} />
            <Tab label="Item Six" {...a11yProps(7)} />
            <Tab label="Item Seven" {...a11yProps(8)} />
            <Tab label="<페이지>" disabled />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <TemplateButton />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <TemplateButton />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <TemplateButton />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <TemplateButton />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <TemplateTable />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <TemplateModal />
        </TabPanel>
        <TabPanel value={value} index={6}>
          <TemplateInput />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
}
