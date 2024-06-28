// mui imports
import {
  ListItemIcon,
  ListItemButton,
  ListItem,
  styled,
  ListItemText,
} from '@mui/material';

import { Link } from 'react-router-dom';

import ArticleIcon from '@mui/icons-material/Article';

//타입지정
interface NavItemProps {
  name: string;
  path: string;
  code: string;
  accessPath: string;
  onClick?: () => void;
}

//스타일 컴포넌트 재구성
const NavItemStyled = styled(ListItemButton)(({ theme }) => ({
  whiteSpace: 'nowrap',
  marginBottom: '2px',
  padding: '8px 10px',
  borderRadius: '8px',
  color: theme.palette.text.secondary,
  paddingLeft: '10px',
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: theme.palette.primary.main,
  },
  '&.Mui-selected': {
    color: 'white',
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

const NavItem = ({ name, path, code, accessPath, onClick }: NavItemProps) => {
  //컴포넌트 렌더링
  return (
    <ListItem component="li" disablePadding key={code}>
      <Link
        to={path}
        style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
      >
        <NavItemStyled
          onClick={onClick}
          selected={accessPath === path}
          sx={{ width: '100%' }}
        >
          <ListItemIcon
            sx={{
              minWidth: '36px',
              p: '3px 0',
              color: 'inherit',
            }}
          >
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText sx={{ width: '100%' }}>
            <>{name}</>
          </ListItemText>
        </NavItemStyled>
      </Link>
    </ListItem>
  );
};

export default NavItem;
