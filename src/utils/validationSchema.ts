import { mixed, object, string } from 'yup';

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

export const employeesSchema = object({
  firstName: string().matches(/^[a-zA-Z]*$/gms, 'Only a-z, A-Z'),
  lastName: string().matches(/^[a-zA-Z]*$/gms, 'Only a-z, A-Z'),
  email: string()
    .email()
    .required(),
  password: string()
    .required()
    .min(5),
  role: string().required(),
});

export const avatarSchema = object().shape({
  picture: mixed()
    .test('type', 'The file must be JPG, JPEG or PNG', (image) => {
      if (image?.length) {
        return (
          image[0].type === 'image/jpeg' ||
          image[0].type === 'image/jpg' ||
          image[0].type === 'image/png'
        );
      }
      return true;
    })
    .test('fileSize', 'The file is too large', (image) => {
      if (image?.length) {
        return image[0].size <= 500000;
      }
      return true;
    }),
});

export const editCvSchema = object({
  name: string().required(),
  description: string().required(),
}).required();
