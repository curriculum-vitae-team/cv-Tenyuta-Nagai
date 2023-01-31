import { Control, FieldValues, Path } from 'react-hook-form';

export type DatePickerInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  required?: string;
  control: Control<T, object>;
};
