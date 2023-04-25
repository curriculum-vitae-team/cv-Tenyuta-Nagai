import { IDepartment } from './../components/pages/DepartmentsPage/DepartmentUpdate/DepartmentUpdateModal.interface';

export const createArrayForDepartments = (data: IDepartment[] | undefined) => {
  if (!data) {
    return [];
  }

  return data.map(({ name }) => name);
};
