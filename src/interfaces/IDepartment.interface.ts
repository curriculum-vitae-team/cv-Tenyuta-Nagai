export interface IDepartment {
  id: string;
  created_at: string;
  name: string;
}

export interface IDepartmentReturn {
  departments: IDepartment[];
}
