import React from 'react';
import { MenuItem, TextField } from '@mui/material';
import { IInputSelectProps } from '../InputSelect/InputSelect.types';

export const InputSelectEmployeePage = <T extends Record<string, unknown>>({
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
      margin="normal"
      fullWidth
      select
      size={size}
      label={label}
      inputProps={register && registerName && register(registerName)}
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
