import { gql } from '@apollo/client';

export const USER_NAME = gql`
  query User($id: ID!) {
    user(id: $id) {
      email
      profile {
        first_name
        last_name
      }
    }
  }
`;
