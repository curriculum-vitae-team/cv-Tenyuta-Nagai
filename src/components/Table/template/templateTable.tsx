import { FC, memo } from 'react';
import {
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  Grid,
  TableBody,
  Avatar,
} from '@mui/material';
import { SearchInput } from '../helpers/Search';
import { AddEmployeeBtn } from '../helpers/AddEmployeeBtn';
import { TableHeaderComponent } from '../TableHeader/TableHeaderComponent';
import { TableRowComponent } from '../TableRows';
import { TableRowItem } from '../TableRows/TableItemRow';
import { Id, TableProps } from './templateTable.types';

const Table = ({ header, items }: TableProps) => {
  console.log(items);
  return (
    <MuiTable stickyHeader>
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
            {item.email ? (
              <TableCell>
                <Avatar src={item.avatar.toString()}>
                  {item.email
                    .toString()
                    .toUpperCase()
                    .slice(0, 1)}
                </Avatar>
              </TableCell>
            ) : (
              <TableCell></TableCell>
            )}
            {header.map(({ columnKey }) => (
              <TableRowItem key={columnKey} value={item[columnKey]} />
            ))}
          </TableRowComponent>
        ))}
      </TableBody>
    </MuiTable>
  );
};

export const createTable = <T extends Id>(): FC<TableProps<T>> => memo(Table);
