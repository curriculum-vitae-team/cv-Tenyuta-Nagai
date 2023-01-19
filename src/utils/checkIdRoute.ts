import { RoutePath } from '../constants/routeVariables';

export const checkIdRoute = (path: string) => {
  const arr = path.split('/');
  const lastPath = arr[arr.length - 1];

  switch (lastPath) {
    case RoutePath.PROFILE:
      return false;
    case RoutePath.SKILLS:
      return false;
    case RoutePath.LANGUAGES:
      return false;
    case RoutePath.CVS:
      return false;
    default:
      return true;
  }
};
