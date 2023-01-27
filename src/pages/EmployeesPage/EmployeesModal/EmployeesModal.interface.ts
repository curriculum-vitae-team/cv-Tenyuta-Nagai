export interface IEmployeesModalProps {
  open: boolean;
  userId: string;
  onClose: () => void;
}

export interface IEmployeesFormInput {
  firstName: string;
  lastName: string;
  position: string;
  department: string;
}
