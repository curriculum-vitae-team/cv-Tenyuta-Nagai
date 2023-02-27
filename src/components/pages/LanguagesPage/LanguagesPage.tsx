import { useQuery } from '@apollo/client';
import { Container, Grid } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { LANGUAGES } from '../../../graphql/queries/languages';
import { useUser } from '../../../hooks/useUser';
import { Spinner } from '../../Spinner';
import { createTable } from '../../Table/template';
import { LanguagesAdditionalButtons } from './LanguageAdditionalBtns/LanguageAdditionalBtns';
import { LanguageCreateModal } from './LanguageCreate';
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
  const { t } = useTranslation();

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
              ModalForCreating={LanguageCreateModal}
              titleModal={t('Create language')}
              searchParameter="name"
              titleCreateBtn={t('Create')}
              isCreateBtnVisible={isAdmin}
              defaultSortingBy="name"
              AdditionalButtons={isAdmin ? LanguagesAdditionalButtons : undefined}
            />
          </Grid>
        </Container>
      )}
    </main>
  );
};

export default LanguagesPage;
