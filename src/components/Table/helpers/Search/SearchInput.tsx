import { TextField, TextFieldProps } from '@mui/material';
import { Search } from '@mui/icons-material';

export const SearchInput = (props: TextFieldProps) => {
  return (
    <TextField
      color="secondary"
      placeholder="Search.."
      InputProps={{ startAdornment: <Search /> }}
      size="small"
      inputProps={{ sx: { px: '10px' } }}
      {...props}
    />
  );
};
