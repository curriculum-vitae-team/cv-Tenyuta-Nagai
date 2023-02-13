import { IProject } from '../../../interfaces/IProject.interface';
import { ProjectInput } from '../inputs/projects';

export type DeleteProjectResult = {
  deleteProject: {
    affected: number;
  };
};

export type DeleteResult = {
  affected: number;
};

export interface IProjectsResult {
  projects: IProject[];
}

export interface IProjectResult {
  project: IProject;
}

export interface CreateProjectResult {
  createProject: {
    id: string;
    project: ProjectInput;
    affected: number;
  };
}
