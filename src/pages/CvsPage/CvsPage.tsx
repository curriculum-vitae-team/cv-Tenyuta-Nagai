import { useQuery } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import React from 'react';
import { Spinner } from '../../components/Spinner';
import { createTable } from '../../components/Table/template';
import { RoutePath } from '../../constants/routeVariables';
import { CVS } from '../../graphql/queries/cvs';
import { ICvsResult } from '../../interfaces/ICv.interface';
import { CreateCvModal } from './CreateCvModal/CreateCvModal';
import { CvsTableHeader } from './data/cvsTableHeader';
import { createCvRowData } from './helpers/createCvRowData';

const CvsPage = () => {
  const Table = createTable();
  const { data, loading } = useQuery<ICvsResult>(CVS);

  const handleDeleteCv = (id: string) => {
    console.log('delete', id);
  };

  return (
    <main>
      <Container maxWidth="xl">
        {loading ? (
          <Spinner />
        ) : (
          <Grid container>
            <Table
              header={CvsTableHeader}
              items={createCvRowData(data?.cvs || [])}
              searchParameter="name"
              buttonNavigatePagePath={RoutePath.CVS}
              buttonNavigateTitle="Info"
              handleDelete={handleDeleteCv}
              titleCreateBtn="Create CV"
              isCreateBtnVisible={true}
              ModalForCreating={CreateCvModal}
            />
          </Grid>
        )}
      </Container>
    </main>
  );
};

export default CvsPage;
