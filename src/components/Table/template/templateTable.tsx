import { FC, memo } from 'react';
import { Table as MuiTable, TableHead, TableRow, TableCell, Grid } from '@mui/material';
import { SearchInput } from '../helpers/Search';
import { AddEmployeeBtn } from '../helpers/AddEmployeeBtn';
import { TableHeaderComponent } from '../TableHeader/TableHeaderComponent';
import { TableProps } from './templateTable.types';

const Table = ({ header }: TableProps) => {
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

        <TableHeaderComponent columns={header} />
      </TableHead>
    </MuiTable>
  );
};

export const createTable = (): FC<TableProps> => memo(Table);
