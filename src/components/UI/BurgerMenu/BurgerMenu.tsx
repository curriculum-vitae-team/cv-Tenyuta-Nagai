import React, { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { Divider, MenuItem, MenuList } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import BallotIcon from '@mui/icons-material/Ballot';
import TranslateIcon from '@mui/icons-material/Translate';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Groups3Icon from '@mui/icons-material/Groups3';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from '../../../constants/routeVariables';
import { CardBurgerMenu, ToolbarBurgerMenu } from './burgerMenu.styles';

interface IBurgerMenuProps {
  open: boolean;
  onClose: () => void;
}

export const BurgerMenu: FC<IBurgerMenuProps> = ({ open, onClose }) => {
  const { t } = useTranslation();

  const handleClose = () => {
    onClose();
  };

  const handleStopPropagation = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
  };

  return (
    <Drawer anchor="left" open={open} disableEscapeKeyDown onClick={handleClose}>
      <CardBurgerMenu onClick={handleStopPropagation}>
        <ToolbarBurgerMenu>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: 'secondary.main',
            }}
          >
            <CloseIcon />
          </IconButton>
        </ToolbarBurgerMenu>
        <CardContent>
          <MenuList dense>
            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.EMPLOYEES}`}
              onClick={handleClose}
            >
              <GroupIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              {t('Employees')}
            </MenuItem>

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.PROJECTS}`}
              onClick={handleClose}
            >
              <BackupTableIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              {t('Projects')}
            </MenuItem>

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.CVS}`}
              onClick={handleClose}
            >
              <BallotIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              {t('Cvs')}
            </MenuItem>

            <Divider />

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.DEPARTMENTS}`}
              onClick={handleClose}
            >
              <Groups3Icon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              {t('Departments')}
            </MenuItem>

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.POSITIONS}`}
              onClick={handleClose}
            >
              <EqualizerIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              {t('Positions')}
            </MenuItem>

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.SKILLS}`}
              onClick={handleClose}
            >
              <EngineeringIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              {t('Skills')}
            </MenuItem>

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.LANGUAGES}`}
              onClick={handleClose}
            >
              <TranslateIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              {t('Languages')}
            </MenuItem>
          </MenuList>
        </CardContent>
      </CardBurgerMenu>
    </Drawer>
  );
};
