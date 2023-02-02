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
        position_name
        profile {
          full_name
        }
      }
      skills {
        skill_name
      }
      languages {
        language_name
        proficiency
      }
    }
  }
`;
