import { mixed, object, string } from 'yup';

export const schema = object({
  email: string()
    .email()
    .required(),
  password: string()
    .required()
    .min(5),
}).required();

export const profileSchema = object().shape({
  picture: mixed()
    .test('type', 'The file must be JPG, JPEG or PNG', (image) => {
      return (
        image &&
        (image[0].type === 'image/jpeg' ||
          image[0].type === 'image/jpg' ||
          image[0].type === 'image/png')
      );
    })
    .test('fileSize', 'The file is too large', (image) => {
      return image && image[0].size <= 5120000;
    }),
});
