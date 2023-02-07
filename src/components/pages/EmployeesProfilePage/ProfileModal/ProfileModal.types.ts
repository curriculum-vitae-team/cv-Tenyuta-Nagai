export interface IProfileModalProps {
  open: boolean;
  userId: string;
  onClose: () => void;
}

export interface IProfileFormInput {
  [key: string]: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
}
