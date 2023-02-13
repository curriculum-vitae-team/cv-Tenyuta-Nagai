import { Chip } from '@mui/material';
import React, { FC } from 'react';
import { ISkillsListProps } from './SkillsList.interface';
import * as Styled from './SkillsList.styles';

export const SkillsList: FC<ISkillsListProps> = ({ data }) => {
  return (
    <Styled.ListMenu>
      {data.map(({ skill_name, mastery }) => (
        <Styled.ItemMenu key={skill_name}>
          {skill_name}
          <Chip sx={{ ml: '10px' }} variant="outlined" label={mastery} color="info" />
        </Styled.ItemMenu>
      ))}
    </Styled.ListMenu>
  );
};
