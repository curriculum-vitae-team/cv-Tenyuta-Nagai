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

import { modalService } from '../../../graphql/service/modalService';
import { Element, Item, TableProps } from './templateTable.types';

const Table = ({
  header,
  items,
  searchParameter,
  ModalForCreating,
  titleModal,
  titleCreateBtn,
  AdditionalButtons,
  isCreateBtnVisible,
  defaultSortingBy,
}: TableProps) => {
  const [searchString, setSearchString] = useState('');
  const [sortingBy, setSortingBy] = useState(defaultSortingBy);
  const [sortingIsAsc, setSortingIsAsc] = useState(true);
  const [direction, setDirection] = useState<Directions>(Directions.Desc);

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

  const handleOpenModal = () => {
    modalService.setModalData(titleModal, ModalForCreating);
  };

  return (
    <>
      <TableContainer sx={{ maxHeight: 'calc(100vh - 120px)' }}>
        <MuiTable stickyHeader>
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
                  <PrivateButton isVisible={isCreateBtnVisible} onClick={handleOpenModal}>
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
                >
                  {header.map(({ columnKey, ColumnCellComponent = TableRowCell }) => (
                    <ColumnCellComponent key={columnKey} item={item} columnKey={columnKey} />
                  ))}
                </TableRowComponent>
              ))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </>
  );
};

export const createTable = (): FC<TableProps<Element>> => memo(Table);
