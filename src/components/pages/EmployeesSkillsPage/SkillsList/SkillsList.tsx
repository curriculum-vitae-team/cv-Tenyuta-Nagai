import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { chipStyle } from '../helpers/chipStyle';
import { ISkillsListProps } from './SkillsList.interface';
import * as Styled from './SkillsList.styles';

export const SkillsList: FC<ISkillsListProps> = ({ data, handleDelete }) => {
  return (
    <Styled.ListMenu>
      {data.map(({ skill_name, mastery }) => (
        <Styled.ItemMenu disableRipple key={skill_name}>
          {skill_name}
          <Styled.ItemChip label={mastery} mastery={chipStyle(mastery)} />
          <IconButton
            sx={{ ml: '25px' }}
            aria-label="delete"
            onClick={() => handleDelete({ skill_name, mastery })}
          >
            <CloseIcon />
          </IconButton>
        </Styled.ItemMenu>
      ))}
    </Styled.ListMenu>
  );
};
