import { RoutePath } from '../../../constants/routeVariables';

export type TableRowProps = {
  children: React.ReactNode;
  handleDelete: (id: string) => void;
  id: string;
  buttonNavigateTitle: string;
  buttonNavigatePagePath: RoutePath;
};
