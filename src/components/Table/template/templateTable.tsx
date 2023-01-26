import { FC, memo, useState } from 'react';
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

import { TableHeaderComponent } from '../TableHeader/TableHeaderComponent';
import { TableRowComponent } from '../TableRows';

import { sortingColumns } from '../helpers/Sorting/sortingColumns';
import { Directions } from '../../../constants/sortingDirections';
import { TableRowCell } from '../TableRows/TableRowCell';
import { PrivateButton } from '../../UI/PrivateButton';
import { useUser } from '../../../hooks/useUser';
import { UserRoles } from '../../../constants/userRoles';
import { Element, Item, TableProps } from './templateTable.types';

const Table = ({ header, items, searchParameter, handleDelete, textAddBtn }: TableProps) => {
  const [searchString, setSearchString] = useState('');
  const [sortingBy, setSortingBy] = useState(header[0].columnKey);
  const [sortingIsAsc, setSortingIsAsc] = useState(true);
  const [direction, setDirection] = useState<Directions>(Directions.Desc);
  const user = useUser();
  const isVisible = user?.role === UserRoles.Admin;

  const handleSetSearchString = (str: string) => {
    setSearchString(str);
  };

  const handleSetSortingDirection = (columnName: string) => {
    sortingIsAsc ? setDirection(Directions.Asc) : setDirection(Directions.Desc);
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
                <PrivateButton isVisible={isVisible} onClick={() => console.log('clicked add btn')}>
                  {textAddBtn}
                </PrivateButton>
              </Grid>
            </TableCell>
          </TableRow>

          <TableHeaderComponent
            columns={header}
            sortingBy={sortingBy}
            handleSetSortingDirection={handleSetSortingDirection}
            direction={direction}
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
              <TableRowComponent key={item.id} id={item.id} handleDelete={handleDelete}>
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
