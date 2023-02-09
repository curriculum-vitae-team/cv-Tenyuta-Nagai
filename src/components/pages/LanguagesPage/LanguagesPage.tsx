import { useQuery } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { LANGUAGES } from '../../../graphql/queries/languages';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../Spinner';
import { createTable } from '../../Table/template';
import { DepartmentsCreateModal } from '../DepartmentsPage/DepartmentCreate';
import { LanguagesTableHeader } from './TableData/LanguagesTableHeader';
import { getAllLanguages } from './TableData/LanguagesTableRows';

const LanguagesPage = () => {
  const Table = createTable();
  const navigate = useNavigate();
  const { data, loading } = useQuery(LANGUAGES, {
    onError: () => navigate(`/${RoutePath.LOGIN}`, { replace: true }),
  });
  const user = useUser();
  const isAdmin = user?.role === UserRoles.Admin;

  return (
    <main>
      {loading ? (
        <Spinner />
      ) : (
        <Container maxWidth="xl">
          <Grid container>
            <Table
              header={LanguagesTableHeader}
              items={getAllLanguages(data?.languages || [])}
              ModalForCreating={DepartmentsCreateModal}
              titleModal={'Create language'}
              searchParameter="name"
              titleCreateBtn="Create language"
              isCreateBtnVisible={isAdmin}
              defaultSortingBy="name"
            />
          </Grid>
        </Container>
      )}
    </main>
  );
};

export default LanguagesPage;
