import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
  query getUsers {
    users {
      id
      email
      created_at
      is_verified
      profile {
        id
        created_at
        first_name
        last_name
        full_name
        avatar
      }
      department_name
      position_name
      role
    }
  }
`;
