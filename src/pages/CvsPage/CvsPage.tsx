import { Container, Grid } from '@mui/material';
import React from 'react';
import { createTable } from '../../components/Table/template';
import { CvsTableHeader } from './data/cvsTableHeader';
import { createCvRowData } from './helpers/createCvRowData';

const CvsPage = () => {
  const Table = createTable();

  return (
    <main>
      <Container maxWidth="xl">
        <Grid container>
          <Table header={CvsTableHeader} items={createCvRowData([])} searchParameter="name" />
        </Grid>
      </Container>
    </main>
  );
};

export default CvsPage;
