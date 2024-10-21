import { Link } from 'react-router-dom';
import {
  Box,
  Typography,
  styled,
  useTheme,
  Popover,
  MenuItem,
  MenuList,
  Paper,
} from '@mui/material';
import mirlogo from '/asset/mirlogo.png';
import Button from '@mui/material/Button';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import AccessibilityIcon from '@mui/icons-material/Accessibility';
import { useState } from 'react';
import packageInfo from '@common/slice/Menu/Package';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
import { packageAccess } from '@common/slice/Menu/MenuSlice';
import { start } from 'repl';

//**************************컴포넌트 스타일 재설정
// Link 스타일 컴포넌트 재정의
const LinkStyled = styled(Link)(() => ({
  height: '90px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));

const PaperStyled = styled(Paper)(({ theme }) => ({
  borderRadius: '10px',
  borderWidth: '2px', // 테두리 두께를 설정합니다.
  borderStyle: 'solid', // 테두리 스타일을 설정합니다.
  borderColor: theme.palette.divider, // 테두리 색상을 검은색으로 설정합니다.
}));

// A 모듈변경 버튼 컴포넌트 재정의
const ModuleChangeBox = styled(Button)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row', // 이미지와 텍스트를 가로로 정렬합니다.
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: '10px',
  backgroundColor: 'transparent',
  padding: '8px',
  width: '100%',
  color: theme.palette.text.primary,
  borderColor: theme.palette.divider, // 테두리 색상을 검은색으로 설정합니다.
  borderWidth: '1px', // 테두리 두께를 설정합니다.
  borderStyle: 'solid', // 테두리 스타일을 설정합니다
  boxShadow: '0 0 1px 0 rgba(0,0,0,0.0),0 2px 2px -2px rgba(0,0,0,0.0)', // 버튼 그림자 삭제합니다.
  '&:hover': {
    backgroundColor: theme.palette.primary.main, // 원하는 색상으로 변경
    color: '#ffffff',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.0),0 2px 2px -2px rgba(0,0,0,0.0)',
  },
}));

// A-01 모듈변경 버튼 컴포넌트 in material icon + text 묶음 재정의
const BoxSetWrap = styled(Box)(({ theme }) => ({
  margin: '0px',
  padding: '0px',
  display: 'flex',
  alignItems: 'center',
}));
// A-02 모듈변경 버튼 컴포넌트 in material icon box 재정의
const MaterialIconBox = styled(Box)(({ theme }) => ({
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  backgroundColor: theme.palette.primary.main,
  color: '#ffffff',
  borderColor: theme.palette.divider,
  border: '2px solid transparent',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  margin: '0px 10px 0px 0px',
}));
// A-03 모듈변경 버튼 컴포넌트 in dropdown 재정의
const ModuleChangeDropBox = styled(Box)(() => ({
  div: {
    width: '220px',
    borderWidth: '1px',
    boxShadow: '0 0 1px 0 rgba(0,0,0,0.0),0 2px 2px -2px rgba(0,0,0,0.0)',
  },
}));

const SideBarHeader = () => {
  //**************************컴포넌트 구성에 필요한 값들 설정

  const theme = useTheme();
  const dispatch = useAppDispatch();
  const packageIndex = useAppSelector(state => state.Menu.accessPackageIndex);

  const handlePackageItemClick = (index: number) => {
    setAnchorEl(null);
    dispatch(packageAccess(index));
  };

  //패키지 선택박스 제어
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const moduleSelectBox = Boolean(anchorEl);

  //*******************************컴포넌트 이벤트 정의

  //패키지 선택박스 열기 이벤트
  const handlePackageSelectOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  //패키지 선택박스 닫힘 이벤트
  const handlePackageSelectClose = () => {
    setAnchorEl(null);
  };

  //************************컴포넌트 렌더링 */
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <LinkStyled
        to="/liberty/dashboard"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src={mirlogo} alt="Logo" width={'50%'} height={'50%'} />
      </LinkStyled>

      <Box sx={{ display: 'flex', alignItems: 'center', width: '220px' }}>
        <ModuleChangeBox
          variant="contained"
          color="primary"
          onClick={handlePackageSelectOpen}
          endIcon={<ArrowDropDownIcon />} // 버튼 오른쪽에 화살표 아이콘을 추가합니다.
        >
          <BoxSetWrap>
            <MaterialIconBox>
              <AccessibilityIcon />
            </MaterialIconBox>
            <Box
              sx={{
                flexDirection: 'column',
              }}
            >
              <Typography variant="h6" align="left">
                {packageInfo[packageIndex].packageName}
              </Typography>
            </Box>
          </BoxSetWrap>
        </ModuleChangeBox>
        <Popover
          id={'packageSelectPopOver'}
          open={moduleSelectBox}
          anchorEl={anchorEl}
          onClose={handlePackageSelectClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          <ModuleChangeDropBox>
            <PaperStyled>
              <MenuList id="split-button-menu" autoFocusItem>
                {packageInfo.map((item, index) => (
                  <MenuItem
                    key={item.packageCode}
                    selected={index === packageIndex}
                    onClick={() => handlePackageItemClick(index)}
                  >
                    {item.packageName}
                  </MenuItem>
                ))}
              </MenuList>
            </PaperStyled>
          </ModuleChangeDropBox>
        </Popover>
      </Box>
    </Box>
  );
};

export default SideBarHeader;
