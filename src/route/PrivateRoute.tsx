import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { useReactiveVar } from '@apollo/client';
import { RoutePath } from '../constants/routeVariables';
import { authService } from '../graphql/authentication/authService';

interface IPrivateRouteProps {
  children: React.ReactNode | JSX.Element;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ children }) => {
  const isAuth = useReactiveVar(authService.access_token$);

  if (!isAuth) {
    return <Navigate to={`/${RoutePath.LOGIN}`} replace />;
  }

  return <>{children}</>;
};
