import { FC, memo } from 'react';
import { Table as MuiTable, TableHead, TableRow, TableCell, Box } from '@mui/material';
import { SearchInput } from '../helpers/Search';
import { AddEmployeeBtn } from '../helpers/AddEmployeeBtn';

export type Item = {
  id: string;
};

export type TableProps = {
  TableHeadComponent: FC;
};

const Table = ({ TableHeadComponent }: TableProps) => {
  return (
    <MuiTable stickyHeader>
      <TableHead>
        <TableRow>
          <TableCell colSpan={20} sx={{ borderBottom: 'none' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <SearchInput />
              <AddEmployeeBtn />
            </Box>
          </TableCell>
        </TableRow>

        <TableHeadComponent />
      </TableHead>
    </MuiTable>
  );
};

const TableComponent = memo(Table) as never;

export const createTable = (): FC<TableProps> => TableComponent;
