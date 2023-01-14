import { ApolloError } from '../constants/apolloErrors';

export const convertApolloError = (error: string) => {
  if (error.includes(ApolloError.EMAIL_EXISTS)) {
    return 'Email already exists';
  }
  return error;
};
