import { IProject } from '../../../../interfaces/IProject.interface';

export const createProjectsIds = (data: IProject[]) => {
  return data.map(({ id }) => id);
};
