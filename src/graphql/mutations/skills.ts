import { gql } from '@apollo/client';

export const CREATE_SKILL = gql`
  mutation CreateSkill($skill: SkillInput!) {
    createSkill(skill: $skill) {
      id
      created_at
      name
    }
  }
`;
