import { gql } from '@apollo/client';

export const CVS = gql`
  query Cvs {
    cvs {
      id
      created_at
      name
      description
      user {
        id
      }
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
  }
`;
