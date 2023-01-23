import { object, string } from 'yup';

export const schema = object({
  email: string()
    .email()
    .required(),
  password: string()
    .required()
    .min(5),
}).required();

export const profileSchema = object({
  firstName: string().matches(/^[a-zA-Z]*$/gms, 'Only a-z, A-Z'),
  lastName: string().matches(/^[a-zA-Z]*$/gms, 'Only a-z, A-Z'),
});
