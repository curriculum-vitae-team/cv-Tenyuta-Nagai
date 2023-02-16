import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Chip, IconButton } from '@mui/material';
import * as Styled from './LanguageList.styles';
import { ILanguagesListProps } from './LanguageList.interface';

export const LanguagesList: FC<ILanguagesListProps> = ({ data, handleDelete, isVisible }) => {
  return (
    <Styled.ListMenu>
      {data.map(({ language_name, proficiency }) => (
        <Styled.ItemBox key={language_name}>
          {language_name}
          <Chip label={proficiency} />
          {isVisible && (
            <IconButton
              sx={{ ml: '25px' }}
              aria-label="delete"
              onClick={() => handleDelete({ language_name, proficiency })}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Styled.ItemBox>
      ))}
    </Styled.ListMenu>
  );
};
