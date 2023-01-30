export interface IAvatarModal {
  open: boolean;
  onClose: () => void;
  userId: string;
}

export interface IAvatarForm {
  picture: FileList;
}
