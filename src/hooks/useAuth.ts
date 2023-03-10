import { useReactiveVar } from '@apollo/client';
import { authService } from '../graphql/service/authentication/authService';

export const useAuth = () => {
  const token = useReactiveVar(authService.access_token$);

  return !!token;
};
