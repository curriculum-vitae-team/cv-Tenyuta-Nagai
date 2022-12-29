import React, { FC } from 'react';
import Drawer from '@mui/material/Drawer';
import CloseIcon from '@mui/icons-material/Close';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import { Divider, MenuItem, MenuList, Toolbar } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import BallotIcon from '@mui/icons-material/Ballot';
import TranslateIcon from '@mui/icons-material/Translate';
import EngineeringIcon from '@mui/icons-material/Engineering';
import Groups3Icon from '@mui/icons-material/Groups3';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { NavLink } from 'react-router-dom';
import { RoutePath } from '../../../utils/routeVariables';

interface IBurgerMenuProps {
  open: boolean;
  onClose: () => void;
}

export const BurgerMenu: FC<IBurgerMenuProps> = ({ open, onClose }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <Drawer anchor="left" open={open} disableEscapeKeyDown onClick={handleClose}>
      <Card
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: 250,
          minHeight: '100vh',
          borderRadius: 0,
          boxShadow: 'none',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            backgroundColor: 'primary.main',
          }}
        >
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              color: 'secondary.main',
            }}
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
        <CardContent>
          <MenuList dense>
            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.EMPLOYEES}`}
              onClick={handleClose}
            >
              <GroupIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              Employees
            </MenuItem>

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.PROJECTS}`}
              onClick={handleClose}
            >
              <BackupTableIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              Projects
            </MenuItem>

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.CVS}`}
              onClick={handleClose}
            >
              <BallotIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              Cvs
            </MenuItem>

            <Divider />

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.DEPARTMENTS}`}
              onClick={handleClose}
            >
              <Groups3Icon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              Departments
            </MenuItem>

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.POSITIONS}`}
              onClick={handleClose}
            >
              <EqualizerIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              Positions
            </MenuItem>

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.SKILLS}`}
              onClick={handleClose}
            >
              <EngineeringIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              Skills
            </MenuItem>

            <MenuItem
              sx={{ fontSize: 18 }}
              component={NavLink}
              to={`/${RoutePath.LANGUAGES}`}
              onClick={handleClose}
            >
              <TranslateIcon sx={{ color: 'secondary.contrastText', mr: 2 }} />
              Languages
            </MenuItem>
          </MenuList>
        </CardContent>
      </Card>
    </Drawer>
  );
};
