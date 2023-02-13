import { IDepartment } from '../../../interfaces/IDepartment.interface';

export interface IDepartmentReturn {
  departments: IDepartment[];
}

export type CreateDepartmentResult = {
  createDepartment: IDepartment;
};
