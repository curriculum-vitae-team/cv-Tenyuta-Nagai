import { ApolloCache, gql, NormalizedCacheObject } from '@apollo/client';
import { IAvatarReturn } from '../../interfaces/IAvatar';
import { IUserAllResult } from '../../interfaces/IUser.interface';
import { USER } from '../queries/user';

export const UPLOAD_AVATAR = gql`
  mutation UploadAvatar($id: ID!, $avatar: AvatarInput!) {
    uploadAvatar(id: $id, avatar: $avatar)
  }
`;

export const DELETE_AVATAR = gql`
  mutation DeleteAvatar($id: ID!) {
    deleteAvatar(id: $id)
  }
`;

export const updateUserCacheAfterAvatarMutation = (
  cache: ApolloCache<NormalizedCacheObject>,
  userId: string,
  data?: IAvatarReturn
) => {
  const dataUser = cache.readQuery<IUserAllResult>({
    query: USER,
    variables: {
      id: userId,
    },
  });

  cache.writeQuery({
    query: USER,
    data: {
      user: {
        ...dataUser?.user,
        profile: {
          ...dataUser?.user.profile,
          avatar: data ? data!.uploadAvatar : null,
        },
      },
    },
    variables: {
      id: userId,
    },
  });
};
