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

export const DELETE_DEPARTMENT = gql`
  mutation DeleteDepartment($id: ID!) {
    deleteDepartment(id: $id) {
      affected
    }
  }
`;

export const UPDATE_DEPARTMENT = gql`
  mutation UpdateDepartment($id: ID!, $department: DepartmentInput!) {
    updateDepartment(id: $id, department: $department) {
      id
      created_at
      name
    }
  }
`;
