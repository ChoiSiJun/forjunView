import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';

const SearchField = () => {
  return (
    <TextField
      fullWidth
      variant="outlined"
      placeholder="Search..."
      InputProps={{
        endAdornment: (
          <IconButton type="submit" aria-label="search">
            <SearchIcon />
          </IconButton>
        ),
      }}
    />
  );
};

export default SearchField;
