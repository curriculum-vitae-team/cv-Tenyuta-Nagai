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

import { Element, Item, TableProps } from './templateTable.types';

const Table = ({
  header,
  items,
  searchParameter,
  ModalForCreating,
  titleCreateBtn,
  AdditionalButtons,
  isCreateBtnVisible,
  defaultSortingBy,
  handleUpdate,
  setItem,
}: TableProps) => {
  const [searchString, setSearchString] = useState('');
  const [sortingBy, setSortingBy] = useState(defaultSortingBy);
  const [sortingIsAsc, setSortingIsAsc] = useState(true);
  const [direction, setDirection] = useState<Directions>(Directions.Desc);

  const [isOpenModal, setIsOpenModal] = useState(false);

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

  const handleSave = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  return (
    <>
      <TableContainer>
        <MuiTable>
          <TableHead>
            <TableRow>
              <TableCell colSpan={10} sx={{ border: 'none' }}>
                <Grid
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    columnGap: '15px',
                  }}
                >
                  <SearchInput
                    handleSetSearchString={handleSetSearchString}
                    searchString={searchString}
                  />
                  <PrivateButton isVisible={isCreateBtnVisible} onClick={handleSave}>
                    {titleCreateBtn}
                  </PrivateButton>
                </Grid>
              </TableCell>
            </TableRow>

            <TableHeaderComponent
              columns={header}
              sortingBy={sortingBy}
              handleSetSortingDirection={handleSetSortingDirection}
              direction={direction}
              AdditionalButtons={AdditionalButtons}
            />
          </TableHead>
          <TableBody>
            {items
              .filter(
                searchString
                  ? (item) =>
                      (item[searchParameter] as string)
                        .toLowerCase()
                        .includes(searchString.toLowerCase())
                  : (item) => item
              )
              .sort(sortingColumns<Item>(sortingBy, sortingIsAsc))

              .map((item) => (
                <TableRowComponent
                  key={item.id as string}
                  item={item}
                  AdditionalButtons={AdditionalButtons}
                  handleUpdate={handleUpdate}
                  setItem={setItem}
                >
                  {header.map(({ columnKey, ColumnCellComponent = TableRowCell }) => (
                    <ColumnCellComponent key={columnKey} item={item} columnKey={columnKey} />
                  ))}
                </TableRowComponent>
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
      {isOpenModal && <ModalForCreating open={isOpenModal} onClose={handleCloseModal} />}
    </>
  );
};

export const createTable = (): FC<TableProps<Element>> => memo(Table);
