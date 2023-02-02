import { Control, FieldValues, Path, UseFormTrigger } from 'react-hook-form';

export type DatePickerInputProps<T extends FieldValues> = {
  name: Path<T>;
  label: string;
  control: Control<T, object>;
  trigger?: UseFormTrigger<FieldValues>;
};
