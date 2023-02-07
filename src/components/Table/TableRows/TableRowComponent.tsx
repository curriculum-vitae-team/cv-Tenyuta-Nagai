import { MoreVert } from '@mui/icons-material';
import { IconButton, TableCell, TableRow } from '@mui/material';
import React, { useState } from 'react';
import { AdditionalButtonsMenu } from '../helpers/AdditionalButtonsMenu/AdditionalButtonsMenu';
import { TableRowProps } from './TableRowComponent.types';

const TableRowComponent = ({
  children,
  AdditionalButtons,
  item,
  handleUpdate,
  setItem,
}: TableRowProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <TableRow>
        {children}
        {AdditionalButtons && (
          <TableCell align="right" sx={{ minWidth: '50px' }}>
            <IconButton
              onClick={handleClick}
              size="small"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <MoreVert />
            </IconButton>
          </TableCell>
        )}
      </TableRow>

      {AdditionalButtons && (
        <AdditionalButtonsMenu open={open} onClose={handleClose} anchorEl={anchorEl}>
          <AdditionalButtons item={item} handleUpdate={handleUpdate!} setItem={setItem} />
        </AdditionalButtonsMenu>
      )}
    </>
  );
};

export { TableRowComponent };
