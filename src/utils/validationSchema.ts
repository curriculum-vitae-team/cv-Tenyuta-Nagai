import i18next from 'i18next';
import { date, mixed, number, object, string } from 'yup';

export const schema = object({
  email: string()
    .email()
    .required(),
  password: string()
    .required()
    .min(5),
});

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

export const projectsSchema = object().shape({
  name: string()
    .required()
    .max(20),
  internalName: string().max(20),
  description: string()
    .required()
    .max(150),
  domain: string()
    .required()
    .max(20),
  startDate: date().required(),
  endDate: date().when(
    'startDate',
    (startDate, schema) =>
      startDate && schema.min(startDate, 'End date must be bigger than start date')
  ),
  teamSize: number()
    .typeError('team size must be a number')
    .min(2)
    .max(100)
    .required(),
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
  name: string()
    .max(30)
    .required(),
  description: string().required(),
});

export const editCvDetailsSchema = object({
  name: string()
    .max(30)
    .required(),
  description: string().required(),
}).required();

export const departmentsSchema = object({
  name: string()
    .max(35)
    .required(),
});

export const skillsSchema = object({
  name: string()
    .max(30)
    .required(),
});

export const languagesSchema = object({
  name: string()
    .matches(/^[a-zA-Z]*$/gms, 'Only a-z, A-Z')
    .max(30)
    .required(),
  iso2: string()
    .matches(/^[A-Z]*$/gms, 'Only A-Z')
    .max(3)
    .required(),
  nativeName: string()
    .matches(/^[a-zA-Z]*$/gms, 'Only a-z, A-Z')
    .max(30),
});

export const positionSchema = object({
  name: string()
    .max(50)
    .required(),
});

export const employeeSkillsSchema = object({
  skillName: string().required(),
  mastery: string().required(),
});

export const employeeLanguagesSchema = object({
  languageName: string().required(),
  proficiency: string().required(),
});
