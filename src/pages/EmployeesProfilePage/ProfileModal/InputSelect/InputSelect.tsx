import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { IInputSelectProps } from './InputSelect.types';

export const InputSelect: FC<IInputSelectProps> = ({
  label,
  defaultValue,
  register,
  registerName,
  data,
}) => {
  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      select
      label={label}
      inputProps={register(registerName)}
      defaultValue={defaultValue}
    >
      {data.map(({ id, name }) => (
        <MenuItem key={id} value={name}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};
