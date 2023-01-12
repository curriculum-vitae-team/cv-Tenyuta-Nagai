import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(auth: { email: $email, password: $password }) {
      user {
        id
        email
        role
        profile {
          id
          full_name
          avatar
        }
      }
      access_token
    }
  }
`;
