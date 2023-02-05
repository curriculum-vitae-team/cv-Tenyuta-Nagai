import { Item } from '../../../Table/template/templateTable.types';

export interface IDepartmentUpdateModalProps {
  open: boolean;
  onClose: () => void;
  departmentData: Item;
}
