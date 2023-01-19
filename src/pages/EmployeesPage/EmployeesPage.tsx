import { useQuery } from '@apollo/client';
import React from 'react';
import { createTable } from '../../components/Table/template/templateTable';
import { GET_ALL_USERS } from '../../graphql/queries/users';
import { Main, TableGrid } from './EmployeesPage.styles';
import { UsersTableHeader } from './TableData/UsersTableHeader';
import { getAllUsers } from './TableData/UsersTableRows';

const EmployeesPage = () => {
  const Table = createTable();
  const { data, loading, error } = useQuery(GET_ALL_USERS);
  console.log(data, error);

  return (
    <Main>
      <TableGrid container>
        <Table header={UsersTableHeader} items={getAllUsers(data?.users || [])} />{' '}
      </TableGrid>
    </Main>
  );
};

export default EmployeesPage;
