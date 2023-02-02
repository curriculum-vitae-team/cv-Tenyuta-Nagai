import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { USER } from '../../../graphql/queries/user';
import { IUserAllResult } from '../../../graphql/types/results/user';
import { useUser } from '../../../hooks/useUser';
import { chooseAvatarLetter } from '../../../utils/chooseAvatarLetter';
import { Row } from '../../Row';
import { Spinner } from '../../Spinner';
import { PrivateButton } from '../../UI/PrivateButton';
import { AvatarModal } from './AvatarModal/AvatarModal';
import * as Styled from './EmployeesProfilePage.styles';
import { convertData } from './helpers/convertData';
import { ProfileModal } from './ProfileModal/ProfileModal';

const EmployeesProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUser();
  const { loading, error, data } = useQuery<IUserAllResult>(USER, {
    variables: { id },
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenAvatarModal, setIsOpenAvatarModal] = useState(false);
  const isVisible = user?.id === id || user?.role === UserRoles.Admin;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    navigate(`/${RoutePath.EMPLOYEES}`, { replace: true });
  }

  const handleEdit = () => {
    setIsOpenModal(true);
  };

  const handleCloseModal = () => {
    setIsOpenModal(false);
  };

  const handleOpenAvatarModal = () => {
    setIsOpenAvatarModal(true);
  };

  const handleCloseAvatarModal = () => {
    setIsOpenAvatarModal(false);
  };

  return (
    <>
      <Styled.PaperWrapper elevation={3}>
        <Styled.Wrapper>
          <Styled.RowWrapper>
            <Styled.UserAvatar
              src={data?.user.profile.avatar}
              onClick={isVisible ? handleOpenAvatarModal : undefined}
              sx={{ ':hover': { cursor: isVisible ? 'pointer' : 'default' } }}
            >
              {chooseAvatarLetter(data?.user)}
            </Styled.UserAvatar>

            <Styled.RowContentTypography>{data?.user.email || '-'}</Styled.RowContentTypography>
          </Styled.RowWrapper>

          <Styled.InfoWrapper>
            <Row title={'First name:'}>{data?.user?.profile.first_name || '-'}</Row>
            <Row title={'Last name:'}>{data?.user?.profile.last_name || '-'}</Row>
            <Row title={'Position:'}>{data?.user?.position?.name || '-'}</Row>
            <Row title={'Department:'}>{data?.user?.department?.name || '-'}</Row>
            <Row title={'A member since'}>{convertData(data?.user?.created_at)}</Row>
          </Styled.InfoWrapper>
        </Styled.Wrapper>

        <PrivateButton isVisible={isVisible} onClick={handleEdit} sx={{ minWidth: 140 }}>
          Edit
        </PrivateButton>
      </Styled.PaperWrapper>

      {isOpenModal && <ProfileModal userId={id!} open={isOpenModal} onClose={handleCloseModal} />}
      {isOpenAvatarModal && (
        <AvatarModal userId={id!} open={isOpenAvatarModal} onClose={handleCloseAvatarModal} />
      )}
    </>
  );
};

export default EmployeesProfilePage;
