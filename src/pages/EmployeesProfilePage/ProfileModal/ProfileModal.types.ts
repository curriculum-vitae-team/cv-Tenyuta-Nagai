export interface IProfileModalProps {
  open: boolean;
  userId: string;
  onClose: () => void;
}

export interface IProfileFormInput {
  picture: FileList;
}
