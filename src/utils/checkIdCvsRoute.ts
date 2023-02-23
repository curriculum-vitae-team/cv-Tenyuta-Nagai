import { RoutePath } from '../constants/routeVariables';

export const checkIdCvsRoute = (path: string) => {
  const arr = path.split('/');
  const lastPath = arr[arr.length - 1];

  switch (lastPath) {
    case RoutePath.DETAILS:
      return false;
    case RoutePath.PROJECTS:
      return false;
    case RoutePath.PREVIEW:
      return false;
    default:
      return true;
  }
};
