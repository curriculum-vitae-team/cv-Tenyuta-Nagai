export interface IProfileModalProps {
  open: boolean;
  userId: string;
  onClose: () => void;
}

type TRole = 'employee' | 'admin';

export interface IProfileFormInput {
  picture: FileList;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  role?: TRole;
}

export type TInputTextType = 'firstName' | 'lastName';
export type TInputSelectType = 'position' | 'department' | 'role';
