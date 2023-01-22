import { gql } from '@apollo/client';

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      created_at
      email
      is_verified
      cvs {
        id
      }
      profile {
        first_name
        last_name
        full_name
        avatar
        skills {
          skill_name
          mastery
        }
        languages {
          language_name
          proficiency
        }
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
