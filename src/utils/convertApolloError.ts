import { ApolloError } from '../constants/apolloErrors';

export const convertApolloError = (error: string) => {
  if (error.includes(ApolloError.EMAIL_EXISTS)) {
    return 'Value already exists';
  }
  return error;
};
