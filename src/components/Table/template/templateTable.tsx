import { FC, memo, useState } from 'react';
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
import { sortingColumns } from '../helpers/Sorting/sortingColumns';
import { Element, Item, TableProps } from './templateTable.types';

const Table = ({ header, items, searchParameter }: TableProps) => {
  const [searchString, setSearchString] = useState('');
  const [sortingBy, setSortingBy] = useState(header[0].columnKey);
  const [sortingIsAsc, setSortingIsAsc] = useState(true);

  const handleSetSearchString = (str: string) => {
    setSearchString(str);
  };

  const handleSetSortingDirection = (columnName: string) => {
    if (columnName === sortingBy) {
      setSortingIsAsc((asc) => !asc);
    } else {
      setSortingBy(columnName);
      setSortingIsAsc(true);
    }
  };

  return (
    <TableContainer>
      <MuiTable>
        <TableHead>
          <TableRow>
            <TableCell colSpan={10} sx={{ border: 'none' }}>
              <Grid sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <SearchInput
                  handleSetSearchString={handleSetSearchString}
                  searchString={searchString}
                />
                <AddEmployeeBtn />
              </Grid>
            </TableCell>
          </TableRow>

          <TableHeaderComponent
            columns={header}
            sortingBy={sortingBy}
            handleSetSortingDirection={handleSetSortingDirection}
            sortingIsAsc={sortingIsAsc}
          />
        </TableHead>
        <TableBody>
          {items
            .filter(
              searchString
                ? (item) => item[searchParameter].toLowerCase().includes(searchString.toLowerCase())
                : (item) => item
            )
            .sort(sortingColumns<Item>(sortingBy, sortingIsAsc))

            .map((item) => (
              <TableRowComponent key={item.id}>
                {item.email ? (
                  <TableCell>
                    <Avatar src={item.avatar}>{item.email[0].toUpperCase()}</Avatar>
                  </TableCell>
                ) : (
                  <TableCell></TableCell>
                )}
                {header.map(({ columnKey }) => (
                  <TableCell key={columnKey}>{item[columnKey]}</TableCell>
                ))}
              </TableRowComponent>
            ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
};

export const createTable = (): FC<TableProps<Element>> => memo(Table);
