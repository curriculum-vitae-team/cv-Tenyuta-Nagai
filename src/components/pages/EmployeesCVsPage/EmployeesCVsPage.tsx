import { useQuery, useReactiveVar } from '@apollo/client';
import { Container } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useUser } from '../../../hooks/useUser';
import { UserRoles } from '../../../constants/userRoles';
import { USER } from '../../../graphql/queries/user';
import { RoutePath } from '../../../constants/routeVariables';
import { Spinner } from '../../Spinner';
import { PrivateButton } from '../../UI/PrivateButton';
import { IUserAllResult } from '../../../graphql/types/results/user';
import { modalService } from '../../../graphql/service/modalService';
import { CvsList } from './CvsList/CvsList';
import { Row } from './Row/Row';
import { CvEditModal } from './CvEditModal/CvEditModal';
import * as Styled from './EmployeesCVsPage.styles';
import { ICvData, ICvEditData } from './EmployeesCVsPage.types';
import { CvsMenu } from './CvsMenu/CvsMenu';

const EmployeesCVsPage = () => {
  const user = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdmin = user?.role === UserRoles.Admin;
  const currentId = isAdmin ? id : user?.id;
  const { t } = useTranslation();
  const { loading, data } = useQuery<IUserAllResult>(USER, {
    variables: { id: currentId },
    onError: () => navigate(`/${RoutePath.EMPLOYEES}`, { replace: true }),
  });
  const [cvData, setCvData] = useState<ICvData>({
    id: '',
    name: '',
    description: '',
  });
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isDataCv, setIsDataCv] = useState(false);
  const cvEditData: Pick<Partial<ICvEditData>, keyof ICvEditData> | null = useReactiveVar(
    modalService.additionalData$
  );

  useEffect(() => {
    if (cvEditData?.editCv) {
      setCvData(cvEditData?.editCv);
      !cvEditData.editCv.id && setIsDataCv(false);
    }
  }, [cvEditData]);

  if (user?.id !== id && !isAdmin) {
    return null;
  }

  const showCvData = (id: string) => {
    const cv = data?.user.cvs?.filter((x) => x.id === id)[0];

    if (cv) {
      setCvData({ id: cv.id, name: cv.name, description: cv.description });
      setIsDataCv(true);
      setIsOpenMenu(false);
    }
  };

  const showCv = (id: string) => {
    return () => showCvData(id);
  };

  const handleOpenMenu = () => {
    setIsOpenMenu(true);
  };

  const handleCloseMenu = () => {
    setIsOpenMenu(false);
  };

  const handleEdit = () => {
    modalService.setModalData(t('Edit CV'), CvEditModal, { id: cvData.id });
  };

  const handlePreview = () => {};

  return (
    <>
      <Styled.Paper elevation={3}>
        {loading ? (
          <Spinner />
        ) : (
          <Container maxWidth="xl">
            <Styled.WrapperCvsButton>
              <Styled.CvsButton variant="outlined" color="secondary" onClick={handleOpenMenu}>
                {t('Cvs list')}
              </Styled.CvsButton>
            </Styled.WrapperCvsButton>

            <Styled.DriverLine />

            <Styled.PositionWrapper>
              <Styled.CvsListWrapper>
                <CvsList data={data?.user?.cvs || []} onClick={showCv} />
              </Styled.CvsListWrapper>

              {isDataCv && (
                <Styled.Wrapper>
                  <Styled.ContentWrapper>
                    <Row title={t('Name') + ':'} content={cvData.name} />
                    <Row title={t('Description') + ':'} content={cvData.description} />
                  </Styled.ContentWrapper>

                  <Styled.ButtonWrapper>
                    <PrivateButton isVisible={isDataCv} onClick={handleEdit}>
                      {t('Edit')}
                    </PrivateButton>

                    <PrivateButton isVisible={isDataCv} onClick={handlePreview} disabled>
                      {t('Preview')}
                    </PrivateButton>
                  </Styled.ButtonWrapper>
                </Styled.Wrapper>
              )}
            </Styled.PositionWrapper>
          </Container>
        )}
      </Styled.Paper>

      <CvsMenu data={data!} open={isOpenMenu} showCvData={showCvData} onClose={handleCloseMenu} />
    </>
  );
};

export default EmployeesCVsPage;
