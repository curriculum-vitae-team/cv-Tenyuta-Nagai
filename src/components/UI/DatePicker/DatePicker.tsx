import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller, FieldValues } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePickerInputProps } from './DatePicker.types';

export const DatePickerInput = <T extends FieldValues>({
  label,
  control,
  name,
  trigger,
}: DatePickerInputProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            {...field}
            value={field.value || null}
            onChange={(date) => {
              field.onChange(date);
              trigger!('endDate');
            }}
            label={label}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                size="small"
                fullWidth
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
