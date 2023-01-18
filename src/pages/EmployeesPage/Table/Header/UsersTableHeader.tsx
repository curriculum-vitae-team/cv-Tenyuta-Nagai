import { TableRow } from '@mui/material';
import { TableCellStyled } from './UsersTableHeader.styles';

const UsersTableHeader = () => {
  return (
    <TableRow>
      <TableCellStyled />
      <TableCellStyled />
      <TableCellStyled>First Name</TableCellStyled>
      <TableCellStyled>Last Name</TableCellStyled>
      <TableCellStyled>Email</TableCellStyled>
      <TableCellStyled>Department</TableCellStyled>
      <TableCellStyled>Position</TableCellStyled>
      <TableCellStyled />
    </TableRow>
  );
};

export default UsersTableHeader;
