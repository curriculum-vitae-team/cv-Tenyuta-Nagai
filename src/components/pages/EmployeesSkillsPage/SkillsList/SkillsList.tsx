import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from '@mui/material';
import { useParams } from 'react-router-dom';
import { chipStyle } from '../helpers/chipStyle';
import { useUser } from '../../../../hooks/useUser';
import { UserRoles } from '../../../../constants/userRoles';
import { ISkillsListProps } from './SkillsList.interface';
import * as Styled from './SkillsList.styles';

export const SkillsList: FC<ISkillsListProps> = ({ data, handleDelete }) => {
  const user = useUser();
  const { id } = useParams();
  const isVisible = user?.id === id || user?.role === UserRoles.Admin;

  return (
    <Styled.ListMenu>
      {data.map(({ skill_name, mastery }) => (
        <Styled.ItemMenu disableRipple key={skill_name}>
          {skill_name}
          <Styled.ItemChip label={mastery} mastery={chipStyle(mastery)} />
          {isVisible && (
            <IconButton
              sx={{ ml: '25px' }}
              aria-label="delete"
              onClick={() => handleDelete({ skill_name, mastery })}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Styled.ItemMenu>
      ))}
    </Styled.ListMenu>
  );
};
