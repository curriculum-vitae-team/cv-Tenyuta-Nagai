import { useReactiveVar } from '@apollo/client';
import { authService } from '../graphql/service/authentication/authService';

export const useUser = () => {
  const user = useReactiveVar(authService.user$);

  return user;
};
