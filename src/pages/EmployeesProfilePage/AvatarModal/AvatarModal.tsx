import React, { FC } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@apollo/client';
import CancelIcon from '@mui/icons-material/Cancel';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { avatarSchema } from '../../../utils/validationSchema';
import { IAvatarReturn } from '../../../interfaces/IAvatar';
import { DELETE_AVATAR, UPLOAD_AVATAR } from '../../../graphql/mutations/avatar';
import { convertToBase64 } from '../helpers/convertToBase64';
import { USER } from '../../../graphql/queries/user';
import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { Spinner } from '../../../components/Spinner';
import { TError } from '../../../types/errorTypes';
import { IAvatarForm, IAvatarModal } from './AvatarModal.types';
import { InputFile } from './InputFile/InputFile';
import * as Styled from './AvatarModal.styles';

export const AvatarModal: FC<IAvatarModal> = ({ userId, onClose, open }) => {
  const { loading, error: errorUser, data: userData } = useQuery<IUserAllResult>(USER, {
    variables: { id: userId },
  });
  const [uploadAvatar, { loading: avatarLoading }] = useMutation<IAvatarReturn>(UPLOAD_AVATAR, {
    update(cache, { data }) {
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
              avatar: data!.uploadAvatar,
            },
          },
        },
        variables: {
          id: userId,
        },
      });
    },
  });

  const [deleteAvatar, { loading: deleteLoading }] = useMutation(DELETE_AVATAR, {
    update(cache) {
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
              avatar: null,
            },
          },
        },
        variables: {
          id: userId,
        },
      });
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<IAvatarForm>({
    mode: 'onChange',
    resolver: yupResolver(avatarSchema),
  });

  if (errorUser) {
    onClose();
  }

  const file = watch('picture');

  const handlerDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handlerOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setValue('picture', e.dataTransfer.files, { shouldValidate: true });
  };

  const handleRemove = async () => {
    try {
      if (userData?.user.profile.avatar) {
        reset();
        await deleteAvatar({
          variables: {
            id: userData.user.profile.id,
          },
        });
      }
    } catch (err) {
      console.error((err as TError).message);
    }
  };

  const onSubmit = async (inputs: IAvatarForm) => {
    try {
      const picture = await convertToBase64(inputs.picture[0]);
      await uploadAvatar({
        variables: {
          id: userData?.user.profile.id,
          avatar: {
            base64: picture,
            size: inputs.picture[0].size,
            type: inputs.picture[0].type,
          },
        },
      });
    } catch (err) {
      console.error((err as TError).message);
    } finally {
      onClose();
    }
  };

  return (
    <ModalWindow title={'Update avatar'} onClose={onClose} open={open}>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Styled.WrapperUserAvatar>
            <Styled.WrapperAvatar>
              <Styled.UserAvatar
                src={
                  (!errors?.picture?.message && file?.length && URL.createObjectURL(file[0])) ||
                  userData?.user.profile.avatar
                }
              />
              <Styled.DeleteButton size="large" onClick={handleRemove}>
                <CancelIcon />
              </Styled.DeleteButton>
            </Styled.WrapperAvatar>

            <Styled.WrapperDropArea onDragOver={handlerDragOver} onDrop={handlerOnDrop}>
              <InputFile registerName={'picture'} register={register}>
                {'Upload avatar'}
              </InputFile>

              <Styled.Paragraph>{'or drag and drop the file here'}</Styled.Paragraph>

              {errors?.picture?.message ? (
                <Styled.ErrorPicture>{errors?.picture?.message}</Styled.ErrorPicture>
              ) : (
                <Styled.Paragraph>{'JPG, JPEG, PNG no more than 500 Kb'}</Styled.Paragraph>
              )}
            </Styled.WrapperDropArea>
          </Styled.WrapperUserAvatar>

          <Styled.ButtonSubmit
            loading={avatarLoading}
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!isValid || !file?.length}
          >
            {'Save'}
          </Styled.ButtonSubmit>

          {deleteLoading && <Spinner />}
        </form>
      )}
    </ModalWindow>
  );
};