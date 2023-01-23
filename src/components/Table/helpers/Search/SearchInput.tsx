import { TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { SearchInputProps } from './SearchInput.types';

export const SearchInput = ({ handleSetSearchString, searchString }: SearchInputProps) => {
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSetSearchString(event?.target.value);
  };

  return (
    <TextField
      color="secondary"
      placeholder="Search.."
      InputProps={{ startAdornment: <Search /> }}
      size="small"
      inputProps={{ sx: { px: '10px' } }}
      onChange={handleSearchInputChange}
      value={searchString}
    />
  );
};
