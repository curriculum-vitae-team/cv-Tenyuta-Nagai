import { IProject } from '../../../../interfaces/IProject.interface';

export function getProjects(projects: IProject[]) {
  return projects.map((project) => ({
    id: project.id,
    name: project.name,
    internalName: project.internal_name || '',
    domain: project.domain,
    startDate: project.start_date,
    endDate: project.end_date || 'Till now',
  }));
}
