import React, { FC } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import * as Styled from './LanguageList.styles';
import { ILanguagesListProps } from './LanguageList.interface';

export const LanguagesList: FC<ILanguagesListProps> = ({ data, handleDelete, isVisible }) => {
  const onDeleteLanguage = (language_name: string, proficiency: string) => {
    return () => handleDelete({ language_name, proficiency });
  };
  const { t } = useTranslation();
  return (
    <Styled.ListMenu>
      {data.map(({ language_name, proficiency }) => (
        <Styled.ItemBox key={language_name}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography sx={{ fontWeight: 'bold' }}>{language_name}</Typography>
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
            {t('Language level:')}
            <Typography sx={{ color: 'secondary.main' }}>{proficiency}</Typography>
          </Box>
        </Styled.ItemBox>
      ))}
    </Styled.ListMenu>
  );
};
