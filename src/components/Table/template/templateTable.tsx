import { FC } from 'react';
import { Table as MuiTable, TableHead, TableRow, TableCell, Grid } from '@mui/material';
import { SearchInput } from '../helpers/Search';
import { AddEmployeeBtn } from '../helpers/AddEmployeeBtn';

// export type TableHead = {
//   columnKey: string;
//   columnName: string;
//   isSortable: boolean;
// }[];

export type TableProps = {
  TableHeaderComponent: FC;
};

const Table = ({ TableHeaderComponent }: TableProps) => {
  return (
    <MuiTable>
      <TableHead>
        <TableRow>
          <TableCell colSpan={10} sx={{ border: 'none' }}>
            <Grid sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <SearchInput />
              <AddEmployeeBtn />
            </Grid>
          </TableCell>
        </TableRow>

        <TableHeaderComponent />
      </TableHead>
    </MuiTable>
  );
};

const TableComponent = Table;

export const createTable = (): FC<TableProps> => TableComponent;
