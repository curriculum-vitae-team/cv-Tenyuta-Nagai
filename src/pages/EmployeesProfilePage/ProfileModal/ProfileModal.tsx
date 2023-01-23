import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@apollo/client';
import { Spinner } from '../../../components/Spinner';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { profileSchema } from '../../../utils/validationSchema';
import { FieldNameProfileForm } from '../../../constants/fieldNameProfileForm';
import { useProfileFormData } from '../../../hooks/useProfileFormData';
import { UPDATE_USER } from '../../../graphql/mutations/updateUser';
import { IUserAllResult } from '../../../interfaces/IUser.interface';
import { UPLOAD_AVATAR } from '../../../graphql/mutations/uploadAvatar';
import { convertToBase64 } from '../helpers/convertToBase64';
import { IAvatarReturn } from '../../../interfaces/IAvatar';
import { notificationService } from '../../../graphql/notification/notificationService';
import { IProfileFormInput, IProfileModalProps } from './ProfileModal.types';
import * as Styled from './ProfileModal.styles';
import { InputText } from './InputText/InputText';
import { InputSelect } from './InputSelect/InputSelect';
import { InputFile } from './InputFile/InputFile';

export const ProfileModal: FC<IProfileModalProps> = ({ userId, open, onClose }) => {
  const { loading, error, userData, positionsData, departmentsData } = useProfileFormData(userId);
  const [updateUser, { loading: updateLoading }] = useMutation<IUserAllResult>(UPDATE_USER);
  const [uploadAvatar, { loading: avatarLoading }] = useMutation<IAvatarReturn>(UPLOAD_AVATAR);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid },
  } = useForm<IProfileFormInput>({
    defaultValues: {
      firstName: userData?.user.profile.first_name || '',
      lastName: userData?.user.profile.last_name || '',
    },
    mode: 'onChange',
    resolver: yupResolver(profileSchema),
  });
  const file = watch('picture');

  if (error) {
    onClose();
  }

  const handlerDragStart = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handlerOnDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setValue('picture', e.dataTransfer.files, { shouldValidate: true });
  };

  const onSubmit = async (inputs: IProfileFormInput) => {
    console.log(inputs);
    console.log(userData);
    try {
      if (inputs?.picture?.length) {
        const picture = await convertToBase64(inputs.picture[0]);
        const avatar = await uploadAvatar({
          variables: {
            id: userId,
            avatar: {
              base64: picture,
              size: inputs.picture[0].size,
              type: inputs.picture[0].type,
            },
          },
        });
        console.log(avatar);
      }

      const res = await updateUser({
        variables: {
          id: userId,
          user: {
            profile: {
              first_name: inputs.firstName,
              last_name: inputs.lastName,
              skills: userData?.user.profile.skills,
              languages: userData?.user.profile.languages,
            },
            departmentId: inputs.department,
            positionId: inputs.position,
            cvsIds: [],
          },
        },
      });

      if (res) {
        notificationService.openSuccessAlert('Saved');
        onClose();
      }
    } catch (err) {
      console.log(err);
      onClose();
    }
  };

  return (
    <ModalWindow title={'Edit profile'} onClose={onClose} open={open}>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <Styled.WrapperUserAvatar>
            <Styled.UserAvatar
              src={
                (!errors?.picture?.message && file?.length && URL.createObjectURL(file[0])) ||
                userData?.user.profile.avatar
              }
            />

            <Styled.WrapperDropArea onDragOver={handlerDragStart} onDrop={handlerOnDrop}>
              <InputFile registerName={FieldNameProfileForm.PICTURE} register={register}>
                {'Upload avatar'}
              </InputFile>

              <Styled.Paragraph>{'or drag and drop the file here'}</Styled.Paragraph>

              {errors?.picture?.message ? (
                <Styled.ErrorPicture>{errors?.picture?.message}</Styled.ErrorPicture>
              ) : (
                <Styled.Paragraph>{'JPG, JPEG, PNG no more than 5 MB'}</Styled.Paragraph>
              )}
            </Styled.WrapperDropArea>
          </Styled.WrapperUserAvatar>

          <InputText
            name="First name"
            registerName={FieldNameProfileForm.FIRST_NAME}
            register={register}
          />

          <InputText
            name="Last name"
            registerName={FieldNameProfileForm.LAST_NAME}
            register={register}
          />

          <InputSelect
            label={'Position'}
            registerName={FieldNameProfileForm.POSITION}
            register={register}
            defaultValue={userData?.user.position?.id || ''}
            data={positionsData!.positions}
          />

          <InputSelect
            label={'Department'}
            registerName={FieldNameProfileForm.DEPARTMENT}
            register={register}
            defaultValue={userData?.user.department?.id || ''}
            data={departmentsData!.departments}
          />

          <Styled.ButtonSubmit
            loading={updateLoading}
            type="submit"
            variant="contained"
            fullWidth
            size="large"
            disabled={!isValid}
          >
            {'Save'}
          </Styled.ButtonSubmit>
        </form>
      )}
    </ModalWindow>
  );
};
