export interface IEmployeesModalProps {
  open: boolean;
  onClose: () => void;
}

export interface IEmployeesFormInput {
  firstName: string;
  lastName: string;
  position: string;
  department: string;
}
