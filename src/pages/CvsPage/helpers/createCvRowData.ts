import { ICv } from '../../../interfaces/ICv.interface';

export function createCvRowData(data: ICv[]) {
  return data?.map((cv) => ({
    id: cv?.id,
    name: cv.name || '',
    description: cv.description || '',
    template: cv.is_template || false,
    user: cv.user?.email || '',
  }));
}
