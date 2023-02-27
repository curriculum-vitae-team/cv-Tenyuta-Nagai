import { TextField } from '@mui/material';
import { Search } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { SearchInputProps } from './SearchInput.types';

export const SearchInput = ({ handleSetSearchString, searchString }: SearchInputProps) => {
  const handleSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleSetSearchString(event?.target.value);
  };
  const { t } = useTranslation();

  return (
    <TextField
      color="secondary"
      placeholder={t('Search..') as string}
      InputProps={{ startAdornment: <Search /> }}
      size="small"
      inputProps={{ sx: { px: '10px' } }}
      onChange={handleSearchInputChange}
      value={searchString}
    />
  );
};
