import { BreadcrumbNames } from '../../../../constants/breadcrumbNames';
import { RoutePath } from '../../../../constants/routeVariables';

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
    case RoutePath.DETAILS:
      return BreadcrumbNames.DETAILS;
    default:
      return name;
  }
};
