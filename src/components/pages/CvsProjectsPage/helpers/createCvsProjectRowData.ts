import { IProject } from '../../../../interfaces/IProject.interface';

export function createCvsProjectRowData(data: IProject[]) {
  return data?.map((project) => ({
    id: project.id,
    projectName: project.name || '',
    internalName: project.internal_name || '',
    domain: project.domain || '',
    startDate: project.start_date || '',
    endDate: project.end_date || '',
  }));
}
