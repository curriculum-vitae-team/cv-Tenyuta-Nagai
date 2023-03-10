export type DeleteProjectInput = {
  id: string;
};

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

export interface IProjectsFormInput {
  name: string;
  internalName: string;
  description: string;
  domain: string;
  startDate: string;
  endDate: string;
  teamSize: number;
}
