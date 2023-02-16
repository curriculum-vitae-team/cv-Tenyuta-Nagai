import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import * as Styled from './LanguageList.styles';
import { ILanguagesListProps } from './LanguageList.interface';

export const LanguagesList: FC<ILanguagesListProps> = ({ data, handleDelete, isVisible }) => {
  const onDeleteLanguage = (language_name: string, proficiency: string) => {
    return () => handleDelete({ language_name, proficiency });
  };
  return (
    <Styled.ListMenu>
      {data.map(({ language_name, proficiency }) => (
        <Styled.ItemBox key={language_name}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold', color: 'primary.contrastText ' }}>
              {language_name}
            </Typography>
            {isVisible && (
              <Styled.IconButtonListItem
                aria-label="delete"
                onClick={onDeleteLanguage(language_name, proficiency)}
              >
                <CloseIcon />
              </Styled.IconButtonListItem>
            )}
          </Box>
          <Box>
            Language level:
            <Typography sx={{ color: 'secondary.main' }}>{proficiency.toUpperCase()}</Typography>
          </Box>
        </Styled.ItemBox>
      ))}
    </Styled.ListMenu>
  );
};
