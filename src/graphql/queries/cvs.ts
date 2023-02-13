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
        email
      }
      skills {
        skill_name
        mastery
      }
      projects {
        name
      }
      languages {
        language_name
        proficiency
      }
      is_template
    }
  }
`;
