import { useQuery } from '@apollo/client';
import { SKILLS } from '../graphql/queries/skills';
import { USER } from '../graphql/queries/user';
import { ISkillsReturn } from '../graphql/types/results/skills';
import { IUserAllResult } from '../graphql/types/results/user';
import { SkillsMastery } from './../constants/skillsMastery';

export const useEmployeeSkillsFormData = (id: string) => {
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery<IUserAllResult>(
    USER,
    {
      variables: { id },
    }
  );
  const { loading: skillsLoading, error: skillsError, data: skillsData } = useQuery<ISkillsReturn>(
    SKILLS
  );
  const skillMasteryData = [
    { id: SkillsMastery.Novice, name: SkillsMastery.Novice },
    { id: SkillsMastery.Advanced, name: SkillsMastery.Advanced },
    { id: SkillsMastery.Expert, name: SkillsMastery.Expert },
  ];

  return {
    loading: loadingUser || skillsLoading,
    error: errorUser || skillsError,
    userData,
    skillsData,
    skillMasteryData,
  };
};
