import React, { FC } from 'react';
import { MenuItem, TextField } from '@mui/material';
import { IInputSelectProps } from './InputSelect.types';

export const InputSelect: FC<IInputSelectProps> = ({
  label,
  defaultValue,
  register,
  registerName,
  data,
  size = 'small',
  ...props
}) => {
  return (
    <TextField
      {...props}
      fullWidth
      size={size}
      margin="normal"
      select
      label={label}
      inputProps={register(registerName)}
      defaultValue={defaultValue}
    >
      {data.map(({ id, name, nameRole }) => (
        <MenuItem key={id} value={id}>
          {name || nameRole}
        </MenuItem>
      ))}
    </TextField>
  );
};
