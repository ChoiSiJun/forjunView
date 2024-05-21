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
import packageInfo from '@common/slice/Package';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@config/ReduxHooks';
import { packageAccess } from '@common/slice/MenuSlice';

//**************************컴포넌트 스타일 재설정
//Link 스타일 컴포넌트 재정의
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
        <Button
          variant="contained"
          color="primary"
          onClick={handlePackageSelectOpen}
          sx={{
            display: 'flex',
            flexDirection: 'row', // 이미지와 텍스트를 가로로 정렬합니다.
            borderRadius: '10px',
            backgroundColor: 'transparent',
            width: '100%',
            color: theme.palette.text.primary,
            borderColor: theme.palette.divider, // 테두리 색상을 검은색으로 설정합니다.
            borderWidth: '2px', // 테두리 두께를 설정합니다.
            borderStyle: 'solid', // 테두리 스타일을 설정합니다.
          }}
          endIcon={<ArrowDropDownIcon />} // 버튼 오른쪽에 화살표 아이콘을 추가합니다.
        >
          <Box
            sx={{
              width: '60px',
              height: '40px',
              borderColor: theme.palette.divider,
              borderWidth: '2px',
              borderStyle: 'solid',
              margin: '3px 10px 3px 3px',
            }}
          >
            <AccessibilityIcon />
          </Box>
          <Box
            sx={{
              flexDirection: 'column',
            }}
          >
            <Typography variant="h6" align="left">
              {packageInfo[packageIndex].packageName}
            </Typography>
          </Box>
        </Button>
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
          <Box sx={{ width: '200px' }}>
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
          </Box>
        </Popover>
      </Box>
    </Box>
  );
};

export default SideBarHeader;
