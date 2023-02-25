import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { chipStyle } from '../helpers/chipStyle';
import { ISkillsListProps } from './SkillsList.interface';
import * as Styled from './SkillsList.styles';

export const SkillsList: FC<ISkillsListProps> = ({ data, handleDelete, isVisible }) => {
  const onDeleteSkill = (skill_name: string, mastery: string) => {
    return () => handleDelete({ skill_name, mastery });
  };

  return (
    <Styled.ListMenu>
      {data.map(({ skill_name, mastery }) => (
        <Styled.ItemMenu disableRipple key={skill_name}>
          {skill_name}
          <Styled.ItemBox>
            <Styled.ItemChip label={mastery} mastery={chipStyle(mastery)} />
            {isVisible && (
              <IconButton aria-label="delete" onClick={onDeleteSkill(skill_name, mastery)}>
                <CloseIcon />
              </IconButton>
            )}
          </Styled.ItemBox>
        </Styled.ItemMenu>
      ))}
    </Styled.ListMenu>
  );
};
