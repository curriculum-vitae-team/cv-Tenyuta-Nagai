import { BreadcrumbNames } from '../constants/breadcrumbNames';
import { RoutePath } from '../constants/routeVariables';
import { IUserName } from '../interfaces/IUser.interface';

export const convertPathName = (name: string) => {
  switch (name) {
    case RoutePath.EMPLOYEES:
      return BreadcrumbNames.EMPLOYEES;
    case RoutePath.DEPARTMENTS:
      return BreadcrumbNames.DEPARTMENTS;
    case RoutePath.CVS:
      return BreadcrumbNames.CVS;
    case RoutePath.LANGUAGES:
      return BreadcrumbNames.LANGUAGES;
    case RoutePath.POSITIONS:
      return BreadcrumbNames.POSITIONS;
    case RoutePath.PROJECTS:
      return BreadcrumbNames.PROJECTS;
    case RoutePath.SKILLS:
      return BreadcrumbNames.SKILLS;
    case RoutePath.PROFILE:
      return BreadcrumbNames.PROFILE;
    default:
      return name;
  }
};

export const checkUSerNameInPath = (arr: string[]) => {
  if (arr[arr.length - 1] === RoutePath.PROFILE) {
    return true;
  }
  return false;
};

export const chooseUserName = (data: IUserName) => {
  if (data.profile.first_name && data.profile.last_name) {
    return `${data.profile.first_name} ${data?.profile.last_name}`;
  } else if (data?.email) {
    return data.email;
  }
  return '...';
};
