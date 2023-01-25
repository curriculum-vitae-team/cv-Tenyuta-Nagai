import { FC, memo } from 'react';
import {
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  TableBody,
  TableContainer,
} from '@mui/material';
import { SearchInput } from '../helpers/Search';
import { AddEmployeeBtn } from '../helpers/AddEmployeeBtn';
import { TableHeaderComponent } from '../TableHeader/TableHeaderComponent';
import { TableRowComponent } from '../TableRows';
import { TableRowCell } from '../TableRows/TableRowCell';
import { Element, TableProps } from './templateTable.types';

const Table = ({ header, items }: TableProps) => {
  return (
    <TableContainer>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell colSpan={10} sx={{ border: 'none' }}>
              <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SearchInput />
                <AddEmployeeBtn />
              </Grid>
            </TableCell>
          </TableRow>

          <TableHeaderComponent columns={header} />
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRowComponent key={item.id}>
              {header.map(({ columnKey, ColumnCellComponent = TableRowCell }) => (
                <ColumnCellComponent key={columnKey} item={item} columnKey={columnKey} />
              ))}
            </TableRowComponent>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export const createTable = (): FC<TableProps<Element>> => memo(Table);
