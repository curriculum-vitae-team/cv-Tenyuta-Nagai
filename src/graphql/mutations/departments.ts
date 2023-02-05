import { gql } from '@apollo/client';

export const CREATE_DEPARTMENT = gql`
  mutation CreateDepartment($department: DepartmentInput!) {
    createDepartment(department: $department) {
      id
      created_at
      name
    }
  }
`;
