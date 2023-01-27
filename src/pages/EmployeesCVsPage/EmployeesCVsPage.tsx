import { useQuery } from '@apollo/client';
import { Container, Divider } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { PrivateButton } from '../../components/UI/PrivateButton';
import { RoutePath } from '../../constants/routeVariables';
import { UserRoles } from '../../constants/userRoles';
import { USER } from '../../graphql/queries/user';
import { useUser } from '../../hooks/useUser';
import { IUserAllResult } from '../../interfaces/IUser.interface';
import { CvsMenu } from './CvsMenu/CvsMenu';
import { ICvData } from './EmployeesCVsPage.types';
import * as Styled from './EmployeesCVsPage.styles';
import { CvEditModal } from './CvEditModal/CvEditModal';
import { Row } from './Row/Row';
import { CvsList } from './CvsList/CvsList';

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
            {isDataCv ? (
              <>
                <Styled.WrapperCvsButton>
                  <Styled.CvsButton variant="outlined" color="secondary" onClick={handleOpenMenu}>
                    Cvs list
                  </Styled.CvsButton>
                </Styled.WrapperCvsButton>

                <Divider />
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
              </>
            ) : (
              <CvsList data={data?.user?.cvs || []} onClick={showCv} />
            )}
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
