import { useQuery } from '@apollo/client';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { RoutePath } from '../../../constants/routeVariables';
import { UserRoles } from '../../../constants/userRoles';
import { USER } from '../../../graphql/queries/user';
import { IUserAllResult } from '../../../graphql/types/results/user';
import { useUser } from '../../../hooks/useUser';
import { Row } from '../../Row';
import { Spinner } from '../../Spinner';
import { PrivateButton } from '../../UI/PrivateButton';
import * as Styled from './EmployeesSkillsPage.styles';
import { SkillsList } from './SkillsList/SkillsList';

const EmployeesSkillsPage = () => {
  const user = useUser();
  const { id } = useParams();
  const navigate = useNavigate();
  const isAdmin = user?.role === UserRoles.Admin;
  const currentId = isAdmin ? id : user?.id;

  const { loading, data } = useQuery<IUserAllResult>(USER, {
    variables: { id: currentId },
    onError: () => navigate(`/${RoutePath.EMPLOYEES}`, { replace: true }),
  });

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <Styled.PaperWrapper elevation={3}>
          <Styled.Wrapper>
            <Styled.InfoWrapper>
              <SkillsList data={data?.user?.profile.skills || []} />
            </Styled.InfoWrapper>
          </Styled.Wrapper>

          <PrivateButton
            isVisible={true}
            onClick={() => console.log('edit')}
            sx={{ minWidth: 140 }}
          >
            Edit
          </PrivateButton>
        </Styled.PaperWrapper>
      )}
    </>
  );
};

export default EmployeesSkillsPage;
