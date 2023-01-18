import React from 'react';
import { createTable } from '../../components/Table/template/templateTable';
import { Main, TableGrid } from './EmployeesPage.styles';
import { UsersTableHeader } from './TableData/UsersTableHeader';

const EmployeesPage = () => {
  const Table = createTable();

  return (
    <Main>
      <TableGrid container>
        <Table header={UsersTableHeader} />
      </TableGrid>
    </Main>
  );
};

export default EmployeesPage;
