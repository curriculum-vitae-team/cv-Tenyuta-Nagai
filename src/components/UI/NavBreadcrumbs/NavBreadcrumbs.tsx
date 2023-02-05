import React, { useEffect, useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { RoutePath } from '../../../constants/routeVariables';
import { chooseUserName, convertPathName } from '../../../utils/convertPathName';
import { USER } from '../../../graphql/queries/user';
import { IUserName, IUserNameResult } from '../../../graphql/types/results/user';
import { CV } from '../../../graphql/queries/cv';
import { ICvQueryResult } from '../../../graphql/types/results/cv';
import * as Styled from './NavBreadcrumbs.styles';

export const NavBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = useMemo(
    () =>
      location.pathname.includes(RoutePath.ERROR)
        ? []
        : location.pathname.split('/').filter((x) => x),
    [location]
  );
  const { id: pathId } = useParams();

  const isEmployees = pathnames[0] === RoutePath.EMPLOYEES;
  const [userName] = useLazyQuery<IUserNameResult>(USER);
  const [userData, setUserData] = useState<IUserName>({
    email: '',
    profile: {
      first_name: '',
      last_name: '',
    },
  });

  const isCvs = pathnames[0] === RoutePath.CVS;
  const [cvName] = useLazyQuery<ICvQueryResult>(CV);
  const [cvData, setCvData] = useState('...');

  useEffect(() => {
    if (!!pathId && isEmployees) {
      userName({ variables: { id: pathId } }).then(({ data }) => {
        if (data?.user) {
          const { email, profile } = data.user;
          setUserData({ email, profile });
        }
      });
    } else if (!!pathId && isCvs) {
      cvName({ variables: { id: pathId } }).then(({ data }) => {
        if (data?.cv) {
          setCvData(data.cv.name);
        }
      });
    }
  }, [cvName, isCvs, isEmployees, pathId, pathnames, userName]);

  return (
    <Styled.WrapperBreadcrumbs role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const isPreLast = index === pathnames.length - 2;

          if (!!pathId && isPreLast && isEmployees) {
            return <Styled.IdName key={name}>{chooseUserName(userData)}</Styled.IdName>;
          } else if (!!pathId && isPreLast && isCvs) {
            return <Styled.IdName key={name}>{cvData}</Styled.IdName>;
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
