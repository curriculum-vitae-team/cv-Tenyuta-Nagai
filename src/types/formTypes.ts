import { FieldValues } from 'react-hook-form';

export type TFormSubmit = (data: FieldValues) => Promise<void>;
