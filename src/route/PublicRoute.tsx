import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { RoutePath } from '../constants/routeVariables';
import { authService } from '../graphql/authentication/authService';

interface IPublicRouteProps {
  children: React.ReactNode | JSX.Element;
}

export const PublicRoute: FC<IPublicRouteProps> = ({ children }) => {
  const isAuth = useReactiveVar(authService.access_token$);

  if (isAuth) {
    return <Navigate to={RoutePath.EMPLOYEES} replace />;
  }

  return <>{children}</>;
};
