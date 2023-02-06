import { useLazyQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { RoutePath } from '../../../../constants/routeVariables';
import { CV } from '../../../../graphql/queries/cv';
import { GET_PROJECT } from '../../../../graphql/queries/project';
import { USER } from '../../../../graphql/queries/user';
import { ICvQueryResult } from '../../../../graphql/types/results/cv';
import { IProjectResult } from '../../../../graphql/types/results/projects';
import { IUserNameResult } from '../../../../graphql/types/results/user';
import { chooseUserName } from '../helpers/convertPathName';

export const useIdPath = (path: string, id: string | undefined) => {
  const [userName] = useLazyQuery<IUserNameResult>(USER);
  const [cvName] = useLazyQuery<ICvQueryResult>(CV);
  const [projectName] = useLazyQuery<IProjectResult>(GET_PROJECT);
  const [name, setName] = useState('...');

  useEffect(() => {
    if (!id) {
      return;
    }

    switch (path) {
      case RoutePath.EMPLOYEES:
        userName({ variables: { id } }).then(({ data }) => {
          if (data?.user) {
            setName(chooseUserName(data.user));
          }
        });
        break;
      case RoutePath.CVS:
        cvName({ variables: { id } }).then(({ data }) => {
          if (data?.cv) {
            setName(data.cv.name);
          }
        });
        break;
      case RoutePath.PROJECTS:
        projectName({ variables: { id } }).then(({ data }) => {
          if (data?.project) {
            setName(data.project.name);
          }
        });
        break;
    }
  }, [cvName, id, path, projectName, userName]);

  return name;
};
