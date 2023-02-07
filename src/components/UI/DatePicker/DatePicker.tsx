import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { Controller } from 'react-hook-form';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePickerInputProps } from './DatePicker.types';

export const DatePickerInput = <T extends Record<string, unknown>>({
  label,
  control,
  name,
  trigger,
  triggerName,
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
              trigger && triggerName && trigger(triggerName);
            }}
            inputFormat="DD-MM-YYYY"
            label={label}
            renderInput={(params) => (
              <TextField
                {...params}
                margin="normal"
                size="small"
                fullWidth
                label={label}
                helperText={fieldState.error?.message}
                error={!!fieldState.error}
              />
            )}
          />
        </LocalizationProvider>
      )}
    />
  );
};
