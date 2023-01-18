import { useQuery } from '@apollo/client';
import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Spinner } from '../../components/Spinner';
import { RoutePath } from '../../constants/routeVariables';
import { USER_NAME } from '../../graphql/query/user';
import { IUserAllResult } from '../../interfaces/IUser.interface';
import { chooseAvatarLetter } from '../../utils/chooseAvatarLetter';
import * as Styled from './EmployeesProfilePage.styles';

const EmployeesProfilePage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<IUserAllResult>(USER_NAME, {
    variables: { id },
  });

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    navigate(`/${RoutePath.EMPLOYEES}`, { replace: true });
  }

  return (
    <Styled.PaperWrapper elevation={3}>
      <Styled.AvatarWrapper>
        <Styled.UserAvatar src={data?.user.profile.avatar} sx={{ width: 60, height: 60 }}>
          {chooseAvatarLetter(data?.user)}
        </Styled.UserAvatar>

        <Styled.NameTypography>
          {data?.user.profile.full_name || data?.user.email}
        </Styled.NameTypography>
      </Styled.AvatarWrapper>

      <Styled.InfoWrapper>
        <Styled.RowWrapper>
          <Typography>Department:</Typography>
          <Typography>{data?.user?.department?.name || '-'}</Typography>
        </Styled.RowWrapper>
      </Styled.InfoWrapper>
    </Styled.PaperWrapper>
  );
};

export default EmployeesProfilePage;
