export interface IProfileModalProps {
  open: boolean;
  userId: string;
  onClose: () => void;
}

export interface IProfileFormInput {
  firstName: string;
  lastName: string;
  position: string;
  department: string;
}
