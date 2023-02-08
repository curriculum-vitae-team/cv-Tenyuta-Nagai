import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { ISkill } from '../../interfaces/ISkill.interface';
import { CreateSkillsResult, ISkillsReturn } from '../types/results/skills';
import { SKILLS } from './../queries/skills';

export const updateCacheAfterCreatingSkill = (
  cache: ApolloCache<NormalizedCacheObject>,
  data?: CreateSkillsResult
) => {
  const allSkills = cache.readQuery<ISkillsReturn>({ query: SKILLS });

  if (allSkills) {
    cache.writeQuery({
      query: SKILLS,
      data: {
        skills: [data?.createSkill, ...allSkills.skills],
      },
    });
  }
};

export const updateCacheAfterDeleteSkill = (cache: ApolloCache<ISkill>, Id: string) => {
  const id = cache.identify({ id: Id, __typename: 'Skill' });
  cache.evict({ id });
  cache.gc();
};
