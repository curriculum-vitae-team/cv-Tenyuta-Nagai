import { useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { PrivateButton } from '../../components/UI/PrivateButton';
import { RoutePath } from '../../constants/routeVariables';
import { UserRoles } from '../../constants/userRoles';
import { USER } from '../../graphql/queries/user';
import { useUser } from '../../hooks/useUser';
import { IUserAllResult } from '../../interfaces/IUser.interface';
import { chooseAvatarLetter } from '../../utils/chooseAvatarLetter';
import * as Styled from './EmployeesProfilePage.styles';
import { convertData } from './helpers/convertData';

const EmployeesProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = useUser();
  const { loading, error, data } = useQuery<IUserAllResult>(USER, {
    variables: { id },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    navigate(`/${RoutePath.EMPLOYEES}`, { replace: true });
  }

  const handleEdit = () => {
    console.log('Edit');
  };

  return (
    <Styled.PaperWrapper elevation={3}>
      <Styled.Wrapper>
        <Styled.RowWrapper>
          <Styled.UserAvatar src={data?.user.profile.avatar}>
            {chooseAvatarLetter(data?.user)}
          </Styled.UserAvatar>

          <Styled.RowContentTypography>{data?.user.email || '-'}</Styled.RowContentTypography>
        </Styled.RowWrapper>

        <Styled.InfoWrapper>
          <Styled.RowWrapper>
            <Styled.RowTitleTypography>First name:</Styled.RowTitleTypography>
            <Styled.RowContentTypography>
              {data?.user?.profile.first_name || '-'}
            </Styled.RowContentTypography>
          </Styled.RowWrapper>

          <Styled.RowWrapper>
            <Styled.RowTitleTypography>Last name:</Styled.RowTitleTypography>
            <Styled.RowContentTypography>
              {data?.user?.profile.last_name || '-'}
            </Styled.RowContentTypography>
          </Styled.RowWrapper>

          <Styled.RowWrapper>
            <Styled.RowTitleTypography>Position:</Styled.RowTitleTypography>
            <Styled.RowContentTypography>
              {data?.user?.position?.name || '-'}
            </Styled.RowContentTypography>
          </Styled.RowWrapper>

          <Styled.RowWrapper>
            <Styled.RowTitleTypography>Department:</Styled.RowTitleTypography>
            <Styled.RowContentTypography>
              {data?.user?.department?.name || '-'}
            </Styled.RowContentTypography>
          </Styled.RowWrapper>

          <Styled.RowWrapper>
            <Styled.RowTitleTypography>A member since</Styled.RowTitleTypography>
            <Styled.RowContentTypography>
              {convertData(data?.user?.created_at)}
            </Styled.RowContentTypography>
          </Styled.RowWrapper>
        </Styled.InfoWrapper>
      </Styled.Wrapper>

      <PrivateButton
        isVisible={user?.id === id || user?.role === UserRoles.Admin}
        onClick={handleEdit}
      >
        Edit
      </PrivateButton>
    </Styled.PaperWrapper>
  );
};

export default EmployeesProfilePage;
