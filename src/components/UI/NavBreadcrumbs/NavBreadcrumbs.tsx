import React, { useEffect, useState, useMemo } from 'react';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink, useLocation, useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { RoutePath } from '../../../constants/routeVariables';
import { chooseUserName, convertPathName } from '../../../utils/convertPathName';
import { USER_NAME } from '../../../graphql/query/user';
import { IUserName, IUserNameResult } from '../../../interfaces/IUser.interface';
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
  const { id: isUserNameInPath } = useParams();
  const [userName] = useLazyQuery<IUserNameResult>(USER_NAME);
  const [userData, setUserData] = useState<IUserName>({
    email: '',
    profile: {
      first_name: '',
      last_name: '',
    },
  });

  useEffect(() => {
    if (!!isUserNameInPath) {
      const getUserName = async () => {
        const userId = pathnames[pathnames.length - 2];
        const { data } = await userName({ variables: { id: userId } });

        if (data?.user) {
          const { email, profile } = data.user;
          setUserData({ email, profile });
        }
      };
      getUserName();
    }
  }, [isUserNameInPath, pathnames, userName]);

  return (
    <Styled.WrapperBreadcrumbs role="presentation">
      <Breadcrumbs aria-label="breadcrumb">
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const isPreLast = index === pathnames.length - 2;

          if (!!isUserNameInPath && isPreLast) {
            return <Styled.UserName key={name}>{chooseUserName(userData)}</Styled.UserName>;
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
