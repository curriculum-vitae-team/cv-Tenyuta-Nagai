export interface IDepartmentUpdateModalProps {
  open: boolean;
  onClose: () => void;
  department: {
    name: string;
    id: string;
  };
}
