import { gql } from '@apollo/client';

export const GET_ALL_PROJECTS = gql`
  query getProjects {
    projects {
      id
      created_at
      name
      internal_name
      description
      domain
      start_date
      end_date
      team_size
      tech_stack {
        id
        created_at
        name
      }
    }
  }
`;
