import { IDepartment } from './../../../interfaces/IDepartment.interface';

export function getAllDepartments(departments: IDepartment[]) {
  return departments?.map((department) => ({
    id: department?.id,
    name: department?.name || '',
  }));
}
