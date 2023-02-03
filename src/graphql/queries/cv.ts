import { gql } from '@apollo/client';

export const CV = gql`
  query Cv($id: ID!) {
    cv(id: $id) {
      id
      created_at
      name
      description
      user {
        id
        email
        position_name
        profile {
          full_name
        }
      }
      skills {
        skill_name
        mastery
      }
      languages {
        language_name
        proficiency
      }
      projects {
        id
      }
      is_template
    }
  }
`;
