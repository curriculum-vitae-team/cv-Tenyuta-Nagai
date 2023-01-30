import { gql } from '@apollo/client';

export const CREATE_PROJECT = gql`
  mutation CreateProject($project: ProjectInput!) {
    createProject(project: $project) {
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
        name
      }
    }
  }
`;
