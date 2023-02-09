import { IProjectResult } from '../../../../graphql/types/results/projects';

export interface IProjectsModalProps {
  open: boolean;
  onClose: () => void;
  projectData: IProjectResult;
}
