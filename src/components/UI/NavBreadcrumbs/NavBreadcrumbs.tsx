import React, { useEffect, useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { RoutePath } from '../../../constants/routeVariables';
import { chooseUserName, convertPathName } from '../../../utils/convertPathName';
import { USER } from '../../../graphql/queries/user';
import { IUserNameResult } from '../../../graphql/types/results/user';
import { CV } from '../../../graphql/queries/cv';
import { ICvQueryResult } from '../../../graphql/types/results/cv';
import { GET_PROJECT } from '../../../graphql/queries/project';
import { IProjectResult } from '../../../graphql/types/results/projects';
import * as Styled from './NavBreadcrumbs.styles';

export const NavBreadcrumbs = () => {
  const location = useLocation();
  const [userName] = useLazyQuery<IUserNameResult>(USER);
  const [cvName] = useLazyQuery<ICvQueryResult>(CV);
  const [projectName] = useLazyQuery<IProjectResult>(GET_PROJECT);
  const pathnames = useMemo(
    () =>
      location.pathname.includes(RoutePath.ERROR)
        ? []
        : location.pathname.split('/').filter((x) => x),
    [location]
  );
  const { id: pathId } = useParams();
  const [pathName, setPathName] = useState('...');
  const isEmployees = pathnames[0] === RoutePath.EMPLOYEES;
  const isCvs = pathnames[0] === RoutePath.CVS;
  const isProjects = pathnames[0] === RoutePath.PROJECTS;

  useEffect(() => {
    if (pathId && isEmployees) {
      userName({ variables: { id: pathId } }).then(({ data }) => {
        if (data?.user) {
          setPathName(chooseUserName(data.user));
        }
      });
    } else if (pathId && isCvs) {
      cvName({ variables: { id: pathId } }).then(({ data }) => {
        if (data?.cv) {
          setPathName(data.cv.name);
        }
      });
    } else if (pathId && isProjects) {
      projectName({ variables: { id: pathId } }).then(({ data }) => {
        if (data?.project) {
          setPathName(data.project.name);
        }
      });
    }
  }, [cvName, isCvs, isEmployees, isProjects, pathId, pathnames, projectName, userName]);

  return (
    <Styled.WrapperBreadcrumbs role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const isPreLast = index === pathnames.length - 2;

          if (pathId && isPreLast && isEmployees) {
            return <Styled.IdName key={name}>{pathName}</Styled.IdName>;
          } else if (pathId && isPreLast && isCvs) {
            return <Styled.IdName key={name}>{pathName}</Styled.IdName>;
          } else if (isLast && pathId && isProjects) {
            return <Typography key={name}>{pathName}</Typography>;
          } else if (isLast) {
            return <Typography key={name}>{convertPathName(name)}</Typography>;
          }

          return (
            <Styled.Link component={NavLink} key={name} to={routeTo}>
              {convertPathName(name)}
            </Styled.Link>
          );
        })}
      </Breadcrumbs>
    </Styled.WrapperBreadcrumbs>
  );
};
