import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { RoutePath } from '../../../../constants/routeVariables';
import * as Styled from '../NavBreadcrumbs.styles';
import { convertPathName } from './convertPathName';

export const CreateBreadcrumbs = (
  pathnames: string[],
  pathId: string | undefined,
  pathName: string
) => {
  const startPath = pathnames[0];
  const { t } = useTranslation();

  return pathnames.map((name, index) => {
    const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
    const isLast = index === pathnames.length - 1;
    const isPreLast = index === pathnames.length - 2;

    if (pathId && isPreLast) {
      if (startPath === RoutePath.EMPLOYEES) {
        return <Styled.IdName key={name}>{pathName}</Styled.IdName>;
      } else if (startPath === RoutePath.CVS) {
        return <Styled.IdName key={name}>{pathName}</Styled.IdName>;
      }
    } else if (isLast && pathId && startPath === RoutePath.PROJECTS) {
      return <Typography key={name}>{pathName}</Typography>;
    } else if (isLast) {
      return <Typography key={name}>{t(convertPathName(name))}</Typography>;
    }

    return (
      <Styled.Link component={NavLink} key={name} to={routeTo}>
        {t(convertPathName(name))}
      </Styled.Link>
    );
  });
};
