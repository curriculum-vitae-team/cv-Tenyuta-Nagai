import React, { useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import TranslateIcon from '@mui/icons-material/Translate';
import { useTranslation } from 'react-i18next';
import { Languages } from '../../../constants/variables';
import { PaperPropsLanguageButtons } from './languageButton.styles';

export const LanguageButton = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { i18n } = useTranslation();
  // const [language, setLanguage] = useState('en');

  const handleSetRus = () => {
    i18n.changeLanguage('ru');
    // setLanguage('ru');
  };

  const handleSetEng = () => {
    i18n.changeLanguage('en');
    // setLanguage('en');
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
        <MenuItem onClick={handleSetEng}>{Languages.EN}</MenuItem>
        <MenuItem onClick={handleSetRus}>{Languages.RU}</MenuItem>
      </Menu>
    </>
  );
};
