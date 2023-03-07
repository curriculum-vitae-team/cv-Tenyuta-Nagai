import { gql } from '@apollo/client';

export const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signup(auth: { email: $email, password: $password }) {
      user {
        id
        email
        role
        profile {
          full_name
        }
      }
      access_token
    }
  }
`;
