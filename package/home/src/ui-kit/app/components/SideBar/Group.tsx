import { ListSubheader, styled } from '@mui/material';

interface NavGroupProps {
  name: string;
  path?: string;
}

//스타일 컴포넌트 재구성
const ListSubheaderStyled = styled(ListSubheader)(({ theme }) => ({
  ...theme.typography.subtitle1,
  fontWeight: '700',
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(0),
  color: theme.palette.text.primary,
  lineHeight: '26px',
  padding: '3px 12px',
}));

//렌더링
const NavGroup = ({ name }: NavGroupProps) => {
  return <ListSubheaderStyled disableSticky>{name}</ListSubheaderStyled>;
};

export default NavGroup;
