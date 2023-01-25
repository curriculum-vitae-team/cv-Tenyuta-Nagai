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
      cvs {
        id
        created_at
        name
        description
        skills {
          skill_name
          mastery
        }
        languages {
          language_name
          proficiency
        }
        is_template
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
