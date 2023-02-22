import React, { useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import TranslateIcon from '@mui/icons-material/Translate';
import { useReactiveVar } from '@apollo/client';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../../constants/languages';
import { languageService } from '../../../graphql/service/languagesService/languagesService';
import { PaperPropsLanguageButtons } from './languageButton.styles';

export const LanguageButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { t, i18n } = useTranslation();
  const lang = useReactiveVar(languageService.lang$);

  useEffect(() => {
    i18n.changeLanguage(lang);
  }, [i18n, lang]);

  const handleSetRus = () => {
    languageService.setLanguage(Languages.RU);
  };

  const handleSetEng = () => {
    languageService.setLanguage(Languages.EN);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <IconButton
        onClick={handleClick}
        size="small"
        aria-controls={open ? 'account-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
      >
        <TranslateIcon color="secondary" />
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: PaperPropsLanguageButtons,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleSetEng}>{t('EN')}</MenuItem>
        <MenuItem onClick={handleSetRus}>{t('RU')}</MenuItem>
      </Menu>
    </>
  );
};
