import { Typography } from '@mui/material';
import i18next from 'i18next';
import { NavLink } from 'react-router-dom';
import { RoutePath } from '../../../../constants/routeVariables';
import * as Styled from '../NavBreadcrumbs.styles';
import { convertPathName } from './convertPathName';

export const createBreadcrumbs = (
  pathnames: string[],
  pathId: string | undefined,
  pathName: string
) => {
  const startPath = pathnames[0];

  return pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    const isPreLast = index === pathnames.length - 2;

    if (pathId && isPreLast) {
      if (startPath === RoutePath.EMPLOYEES) {
        return (
          <Styled.IdName component={NavLink} key={name} to={`${routeTo}/${RoutePath.PROFILE}`}>
            {pathName}
          </Styled.IdName>
        );
      } else if (startPath === RoutePath.CVS) {
        return (
          <Styled.IdName component={NavLink} key={name} to={`${routeTo}/${RoutePath.DETAILS}`}>
            {pathName}
          </Styled.IdName>
        );
      }
    } else if (isLast && pathId && startPath === RoutePath.PROJECTS) {
      return <Typography key={name}>{pathName}</Typography>;
    } else if (isLast) {
      return <Typography key={name}>{i18next.t(convertPathName(name))}</Typography>;
    }

    return (
      <Styled.Link component={NavLink} key={name} to={routeTo}>
        {i18next.t(convertPathName(name))}
      </Styled.Link>
    );
  });
};
