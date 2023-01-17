import { TextField, TextFieldProps } from '@mui/material';
import { Search } from '@mui/icons-material';

export const SearchInput = (props: TextFieldProps) => {
  return (
    <TextField
      color="secondary"
      placeholder="Search.."
      InputProps={{ startAdornment: <Search /> }}
      size="medium"
      inputProps={{ sx: { px: '10px' } }}
      sx={{ p: '5px', height: '30px' }}
      {...props}
    />
  );
};
