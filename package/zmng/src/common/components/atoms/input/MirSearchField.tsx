import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

export interface MirSearchFieldProps {
  InputRef: React.RefObject<HTMLInputElement>;
  placeholder?: string;
  onClick: () => void;
}

const MirSearchField = ({
  InputRef,
  onClick,
  placeholder,
}: MirSearchFieldProps) => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder={placeholder}
      inputRef={InputRef}
      InputProps={{
        endAdornment: (
          <IconButton type="button" aria-label="search" onClick={onClick}>
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default MirSearchField;
