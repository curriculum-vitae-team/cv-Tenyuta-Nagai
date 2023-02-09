import { useQuery } from '@apollo/client';
import React from 'react';
import { Grid } from '@mui/material';
import { Container } from '@mui/system';
import { createTable } from '../../Table/template';
import { POSITIONS } from '../../../graphql/queries/positions';
import { Spinner } from '../../Spinner';
import { IPositionReturn } from '../../../graphql/types/results/position';
import { useUser } from '../../../hooks/useUser';
import { UserRoles } from '../../../constants/userRoles';
import { createPositionsData } from './helpers/createPositionsData';
import { PositionsTableHeader } from './data/PositionsTableHeader';
import { CreatePositionModal } from './CreatePositionModal/CreatePositionModal';

const PositionsPage = () => {
  const Table = createTable();
  const { data, loading } = useQuery<IPositionReturn>(POSITIONS);
  const user = useUser();
  console.log(data);

  return (
    <main>
      <Container maxWidth="xl">
        {loading ? (
          <Spinner />
        ) : (
          <Grid container>
            <Table
              header={PositionsTableHeader}
              items={createPositionsData(data)}
              searchParameter="name"
              titleCreateBtn="Create Position"
              isCreateBtnVisible={user?.role === UserRoles.Admin}
              ModalForCreating={CreatePositionModal}
              titleModal={'Create Position'}
              // AdditionalButtons={CvsAdditionalButtons}
              defaultSortingBy="name"
            />
          </Grid>
        )}
      </Container>
    </main>
  );
};

export default PositionsPage;
