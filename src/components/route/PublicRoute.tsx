import React, { FC } from 'react';
import { Navigate } from 'react-router-dom';
import { RoutePath } from '../../constants/routeVariables';
import { useAuth } from '../../hooks/useAuth';

interface IPublicRouteProps {
  children: React.ReactNode | JSX.Element;
}

export const PublicRoute: FC<IPublicRouteProps> = ({ children }) => {
  const isAuth = useAuth();

  if (isAuth) {
    return <Navigate to={RoutePath.EMPLOYEES} replace />;
  }

  return <>{children}</>;
};
