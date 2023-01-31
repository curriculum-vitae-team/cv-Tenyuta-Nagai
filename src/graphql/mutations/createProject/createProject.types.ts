import { IProject } from './../../../interfaces/IProject.interface';
export interface ProjectInput {
  name: string;
  internal_name: string;
  description: string;
  domain: string;
  start_date: string;
  end_date: string | null;
  team_size: number;
  skillsIds: string[];
}

export interface CreateProjectInput {
  project: ProjectInput;
}

export interface IProjectsResult {
  projects: IProject[];
}

export interface CreateProjectResult {
  createProject: {
    id: string;
    project: ProjectInput;
    affected: number;
  };
}
