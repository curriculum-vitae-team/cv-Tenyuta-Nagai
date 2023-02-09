import { useMutation } from '@apollo/client';
import { Divider, MenuItem } from '@mui/material';
import { FC } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IAdditionalButtonsProps } from '../../../Table/TableRows/TableRowComponent.types';
import { modalService } from '../../../../graphql/service/modalService';
import { DELETE_LANGUAGE } from '../../../../graphql/mutations/languages';
import { updateCacheAfterDeleteLanguage } from '../../../../graphql/cache/languages';
import { LanguageUpdateModal } from '../LanguageUpdate';
import * as Styled from './LanguageAdditionalBtns.styles';

export const LanguagesAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id, name } = item;
  const [deleteLanguage] = useMutation(DELETE_LANGUAGE);

  const handleLanguageDelete = () => {
    deleteLanguage({
      variables: { id: id },
      update(cache) {
        updateCacheAfterDeleteLanguage(cache, id as string);
      },
    });
  };

  const updateLanguage = () => {
    modalService.setModalData('Update language', LanguageUpdateModal, {
      name: name as string,
      id: id as string,
    });
  };

  return (
    <>
      <MenuItem sx={Styled.ActionsMenuRowItemProps} onClick={updateLanguage}>
        <UpdateIcon sx={Styled.ActionsMenuRowIconsProps} />
        Update
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleLanguageDelete} sx={Styled.ActionsMenuRowItemProps}>
        <DeleteOutlineIcon sx={Styled.ActionsMenuRowIconsProps} />
        Delete
      </MenuItem>
    </>
  );
};
