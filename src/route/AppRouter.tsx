import React, { lazy } from 'react';
import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom';
import { Layout } from '../components/Layout';
import ErrorPage from '../pages/ErrorPage';
import { RoutePath } from '../constants/routeVariables';
import { useAuth } from '../hooks/useAuth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

const LogInPage = lazy(() => import('../pages/LogInPage'));
const SignUpPage = lazy(() => import('../pages/SignUpPage'));
const ProjectsPage = lazy(() => import('../pages/ProjectsPage'));
const EmployeesPage = lazy(() => import('../pages/EmployeesPage'));
const CvsPage = lazy(() => import('../pages/CvsPage'));
const DepartmentsPage = lazy(() => import('../pages/DepartmentsPage'));
const PositionsPage = lazy(() => import('../pages/PositionsPage'));
const LanguagesPage = lazy(() => import('../pages/LanguagesPage'));
const SkillsPage = lazy(() => import('../pages/SkillsPage'));

export const AppRouter = () => {
  const isAuth = useAuth();

  return (
    <BrowserRouter>
      <Routes>
        <Route path={RoutePath.HOME} element={<Layout />}>
          <Route
            index
            element={
              isAuth ? (
                <Navigate to={`/${RoutePath.EMPLOYEES}`} replace />
              ) : (
                <Navigate to={`/${RoutePath.LOGIN}`} replace />
              )
            }
          />

          <Route path={RoutePath.LOGIN} element={<PublicRoute>{<LogInPage />}</PublicRoute>} />
          <Route path={RoutePath.SIGNUP} element={<PublicRoute>{<SignUpPage />}</PublicRoute>} />

          <Route
            path={RoutePath.PROJECTS}
            element={<PrivateRoute>{<ProjectsPage />}</PrivateRoute>}
          />
          <Route
            path={RoutePath.EMPLOYEES}
            element={<PrivateRoute>{<EmployeesPage />}</PrivateRoute>}
          />
          <Route path={RoutePath.CVS} element={<PrivateRoute>{<CvsPage />}</PrivateRoute>} />
          <Route
            path={RoutePath.DEPARTMENTS}
            element={<PrivateRoute>{<DepartmentsPage />}</PrivateRoute>}
          />
          <Route path={RoutePath.SKILLS} element={<PrivateRoute>{<SkillsPage />}</PrivateRoute>} />
          <Route
            path={RoutePath.DEPARTMENTS}
            element={<PrivateRoute>{<DepartmentsPage />}</PrivateRoute>}
          />
          <Route
            path={RoutePath.POSITIONS}
            element={<PrivateRoute>{<PositionsPage />}</PrivateRoute>}
          />
          <Route
            path={RoutePath.LANGUAGES}
            element={<PrivateRoute>{<LanguagesPage />}</PrivateRoute>}
          />

          <Route path={RoutePath.ERROR} element={<ErrorPage pageNotFound={true} />} />
          <Route
            path={RoutePath.GENERAL}
            element={
              isAuth ? (
                <Navigate to={RoutePath.ERROR} replace />
              ) : (
                <Navigate to={RoutePath.LOGIN} replace />
              )
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
