import React, { FC } from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller, FieldValues } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePickerInputProps } from './DatePicker.types';

export const DatePickerInput = <T extends FieldValues>({
  label,
  control,
  name,
  required,
}: DatePickerInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        required,
      }}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            inputFormat="YYYY/MM/DD"
            label={label}
            renderInput={(params) => (
              <TextField
                {...params}
                label={label}
                helperText={fieldState.error?.message || ' '}
                error={!!fieldState.error}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};
