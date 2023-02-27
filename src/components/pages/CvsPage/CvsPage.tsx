import { useQuery } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { CVS } from '../../../graphql/queries/cvs';
import { ICvsResult } from '../../../graphql/types/results/cv';
import { Spinner } from '../../Spinner';
import { createTable } from '../../Table/template';
import { CreateCvModal } from './CreateCvModal/CreateCvModal';
import { CvsAdditionalButtons } from './CvsAdditionalButtons/CvsAdditionalButtons';
import { CvsTableHeader } from './data/cvsTableHeader';
import { createCvRowData } from './helpers/createCvRowData';

const CvsPage = () => {
  const Table = createTable();
  const { data, loading } = useQuery<ICvsResult>(CVS);
  const { t } = useTranslation();

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
              titleCreateBtn={t('Create CV')}
              isCreateBtnVisible={true}
              ModalForCreating={CreateCvModal}
              titleModal={t('Create CV')}
              AdditionalButtons={CvsAdditionalButtons}
              defaultSortingBy="name"
            />
          </Grid>
        )}
      </Container>
    </main>
  );
};

export default CvsPage;
