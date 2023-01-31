export interface IProjectsModalProps {
  open: boolean;
  onClose: () => void;
}

export interface IProjectsFormInput {
  name: string;
  internalName: string;
  description: string;
  domain: string;
  startDate: string;
  endDate: string;
  teamSize: number;
}
