import { useQuery } from '@apollo/client';
import { DEPARTMENTS } from '../graphql/queries/departments';
import { POSITIONS } from '../graphql/queries/positions';
import { SKILLS } from '../graphql/queries/skills';
import { USER } from '../graphql/queries/user';
import { IDepartmentReturn } from '../graphql/types/results/department';
import { IPositionReturn } from '../graphql/types/results/position';
import { ISkillsReturn } from '../graphql/types/results/skills';
import { IUserAllResult } from '../graphql/types/results/user';
import { SkillsMastery } from './../constants/skillsMastery';

export const useProfileFormData = (id: string) => {
  const { loading: loadingUser, error: errorUser, data: userData } = useQuery<IUserAllResult>(
    USER,
    {
      variables: { id },
    }
  );
  const { loading: departmentsLoading, error: departmentsError, data: departmentsData } = useQuery<
    IDepartmentReturn
  >(DEPARTMENTS);
  const { loading: positionsLoading, error: positionsError, data: positionsData } = useQuery<
    IPositionReturn
  >(POSITIONS);
  const { loading: skillsLoading, error: skillsError, data: skillsData } = useQuery<ISkillsReturn>(
    SKILLS
  );
  const skillMasteryData = [
    { id: SkillsMastery.Novice, name: SkillsMastery.Novice },
    { id: SkillsMastery.Advanced, name: SkillsMastery.Advanced },
    { id: SkillsMastery.Expert, name: SkillsMastery.Expert },
  ];

  return {
    loading: loadingUser || departmentsLoading || positionsLoading || skillsLoading,
    error: errorUser || departmentsError || positionsError || skillsError,
    userData,
    departmentsData,
    positionsData,
    skillsData,
    skillMasteryData,
  };
};
