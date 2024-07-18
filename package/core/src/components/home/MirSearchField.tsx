import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { InputBase, Paper } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

export interface MirSearchFieldProps {
  placeholder?: string;
}

const handlerClick = () => {
  alert('클릭!');
};
const MirSearchField = ({ placeholder }: MirSearchFieldProps) => {
  return (
    <Paper
      component="form"
      sx={{
        p: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <IconButton sx={{ p: '10px' }} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder={placeholder}
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      <IconButton
        type="button"
        sx={{ p: '10px' }}
        aria-label="search"
        onClick={handlerClick}
      >
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default MirSearchField;
