import { ICv } from '../../../../interfaces/ICv.interface';

export function createCvRowData(data: ICv[]) {
  return data?.map((cv) => ({
    id: cv?.id,
    name: cv.name || '',
    description: cv.description || '',
    template: cv.is_template,
    employee: cv.user?.email || '',
    projects: cv.projects?.reduce((acc, item) => (acc += `${item.name}, `), '').slice(0, -2),
  }));
}
