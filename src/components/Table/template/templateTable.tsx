import { FC, memo } from 'react';
import {
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  TableBody,
  Avatar,
  TableContainer,
} from '@mui/material';
import { SearchInput } from '../helpers/Search';
import { AddEmployeeBtn } from '../helpers/AddEmployeeBtn';
import { TableHeaderComponent } from '../TableHeader/TableHeaderComponent';
import { TableRowComponent } from '../TableRows';
import { AvatarImage } from '../helpers/Avatar/Avatar';
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
              {header.map(({ columnKey, ColumnCellComponent }) => (
                <>
                  {columnKey === 'avatar' ? (
                    <AvatarImage source={item.avatar} value={item.email[0].toUpperCase()} />
                  ) : (
                    // ColumnCellComponent
                    <TableCell key={columnKey}>{item[columnKey]}</TableCell>
                  )}
                </>
              ))}
            </TableRowComponent>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export const createTable = (): FC<TableProps<Element>> => memo(Table);
