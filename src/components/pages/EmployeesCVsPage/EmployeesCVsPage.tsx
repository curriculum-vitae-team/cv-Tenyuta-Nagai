import { useQuery } from '@apollo/client';
import { Container } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUser } from '../../../hooks/useUser';
import { UserRoles } from '../../../constants/userRoles';
import { USER } from '../../../graphql/queries/user';
import { RoutePath } from '../../../constants/routeVariables';
import { Spinner } from '../../Spinner';
import { PrivateButton } from '../../UI/PrivateButton';
import { IUserAllResult } from '../../../graphql/types/results/userTypeResult';
import { CvsList } from './CvsList/CvsList';
import { Row } from './Row/Row';
import { CvEditModal } from './CvEditModal/CvEditModal';
import * as Styled from './EmployeesCVsPage.styles';
import { ICvData } from './EmployeesCVsPage.types';
import { CvsMenu } from './CvsMenu/CvsMenu';

const EmployeesCVsPage = () => {
  const user = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const currentId = user?.role === UserRoles.Admin ? id : user?.id;
  const { loading, error, data } = useQuery<IUserAllResult>(USER, {
    variables: { id: currentId },
  });
  const [cvData, setCvData] = useState<ICvData>({
    id: '',
    name: '',
    description: '',
  });
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const [isDataCv, setIsDataCv] = useState(false);
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);

  if (error) {
    navigate(`/${RoutePath.EMPLOYEES}`);
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
    setIsOpenEditModal(true);
  };

  const handlePreview = () => {};

  const handleCloseEditModal = (data?: ICvData) => {
    if (data) {
      setCvData(data);
      !data.id && setIsDataCv(false);
    }

    setIsOpenEditModal(false);
  };

  return (
    <>
      <Styled.Paper elevation={3}>
        {loading ? (
          <Spinner />
        ) : (
          <Container maxWidth="xl">
            <Styled.WrapperCvsButton>
              <Styled.CvsButton variant="outlined" color="secondary" onClick={handleOpenMenu}>
                Cvs list
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
                    <Row title={'Name:'} content={cvData.name} />
                    <Row title={'Description:'} content={cvData.description} />
                  </Styled.ContentWrapper>

                  <Styled.ButtonWrapper>
                    <PrivateButton isVisible={isDataCv} onClick={handleEdit}>
                      Edit
                    </PrivateButton>

                    <PrivateButton isVisible={isDataCv} onClick={handlePreview} disabled>
                      Preview
                    </PrivateButton>
                  </Styled.ButtonWrapper>
                </Styled.Wrapper>
              )}
            </Styled.PositionWrapper>
          </Container>
        )}
      </Styled.Paper>

      <CvsMenu data={data!} open={isOpenMenu} showCvData={showCvData} onClose={handleCloseMenu} />

      {isOpenEditModal && (
        <CvEditModal
          cvId={cvData.id}
          userData={data!}
          open={isOpenEditModal}
          onClose={handleCloseEditModal}
        />
      )}
    </>
  );
};

export default EmployeesCVsPage;
