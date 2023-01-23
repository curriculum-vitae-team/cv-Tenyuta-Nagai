export interface IProfileModalProps {
  open: boolean;
  userId: string;
  onClose: () => void;
}

export interface IProfileFormInput {
  picture: FileList;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
}

export type TInputTextType = 'firstName' | 'lastName';
export type TInputSelectType = 'position' | 'department';
