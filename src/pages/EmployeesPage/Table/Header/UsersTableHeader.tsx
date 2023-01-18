import { TableCell, TableRow } from '@mui/material';

const UsersTableHeader = () => {
  return (
    <TableRow>
      <TableCell />
      <TableCell>First Name</TableCell>
      <TableCell>Last Name</TableCell>
      <TableCell>Email</TableCell>
      <TableCell>Department</TableCell>
      <TableCell>Position</TableCell>
      <TableCell />
    </TableRow>
  );
};

export default UsersTableHeader;
