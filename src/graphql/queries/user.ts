import { gql } from '@apollo/client';

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      created_at
      email
      profile {
        first_name
        last_name
        full_name
        avatar
      }
      department {
        id
        created_at
        name
      }
      department_name
      position {
        id
        created_at
        name
      }
      role
    }
  }
`;
