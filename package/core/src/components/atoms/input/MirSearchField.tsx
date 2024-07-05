import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export const MirSearchFieldGuide = {
  title: '검색 필드',
  code: ` const inputRef = useRef(null);
  <SearchField InputRef={inputRef} onClick={function (): void {alert('검색');}}  menuOpenClick={function (): void {alert('메뉴오픈');}} />`,

  requireNote: ['InputRef : 검색 필드에 연결될 Ref값'],

  optionNote: [
    'placeholder: placeholder',
    'onClick : 검색버튼 클릭시 호출 이벤트',
    'menuOpenClick : 메뉴 오픈 이벤트',
  ],
};

export interface MirSearchFieldProps {
  InputRef: React.RefObject<HTMLInputElement>;
  placeholder?: string;
  onClick?: () => void;
  menuOpenClick?: () => void;
}

const MirSearchField = ({
  InputRef,
  onClick,
  menuOpenClick,
  placeholder,
}: MirSearchFieldProps) => {
  return (
    <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu" onClick={menuOpenClick}>
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputRef={InputRef}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={onClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default MirSearchField;
