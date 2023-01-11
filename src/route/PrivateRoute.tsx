import React, { FC, Suspense } from 'react';
import { Navigate } from 'react-router-dom';
import { Spinner } from '../components/Spinner';
import { useAuth } from '../hooks/useAuth';
import { RoutePath } from '../constants/routeVariables';

interface IPrivateRouteProps {
  children: React.ReactNode | JSX.Element;
}

export const PrivateRoute: FC<IPrivateRouteProps> = ({ children }) => {
  const isAuth = useAuth();

  if (!isAuth) {
    return <Navigate to={`/${RoutePath.LOGIN}`} replace />;
  }

  return <Suspense fallback={<Spinner />}>{children}</Suspense>;
};
