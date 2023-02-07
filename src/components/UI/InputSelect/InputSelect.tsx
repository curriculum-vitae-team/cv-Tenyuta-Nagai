import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { IInputSelectProps } from './InputSelect.types';

export const InputSelect = <T extends Record<string, unknown>>({
  label,
  defaultValue,
  register,
  registerName,
  data,
  size = 'small',
  ...props
}: IInputSelectProps<T>) => {
  return (
    <TextField
      {...props}
      fullWidth
      size={size}
      margin="normal"
      select
      label={label}
      inputProps={register && registerName && register(registerName)}
      defaultValue={defaultValue}
    >
      {data.map(({ id, name }) => (
        <MenuItem key={id} value={id}>
          {name}
        </MenuItem>
      ))}
    </TextField>
  );
};
