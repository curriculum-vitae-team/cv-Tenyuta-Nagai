import { useMutation } from '@apollo/client';
import { Divider, MenuItem } from '@mui/material';
import { FC } from 'react';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IAdditionalButtonsProps } from '../../../Table/TableRows/TableRowComponent.types';
import { updateCacheAfterDeleteSkill } from '../../../../graphql/cache/skills';
import { DELETE_SKILL } from '../../../../graphql/mutations/skills';
import { SkillsUpdateModal } from '../SkillUpdate';
import { modalService } from '../../../../graphql/service/modalService';
import * as Styled from './SkillsAdditionalBtns.styles';

export const SkillsAdditionalButtons: FC<IAdditionalButtonsProps> = ({ item }) => {
  const { id, name } = item;
  const [deleteSkill] = useMutation(DELETE_SKILL);

  const handleSkillDelete = () => {
    deleteSkill({
      variables: { id: id },
      update(cache) {
        updateCacheAfterDeleteSkill(cache, id as string);
      },
    });
  };

  const updateSkill = () => {
    modalService.setModalData('Update skill', SkillsUpdateModal, {
      name: name as string,
      id: id as string,
    });
  };

  return (
    <>
      <MenuItem sx={Styled.ActionsMenuRowItemProps} onClick={updateSkill}>
        <UpdateIcon sx={Styled.ActionsMenuRowIconsProps} />
        Update
      </MenuItem>

      <Divider />

      <MenuItem onClick={handleSkillDelete} sx={Styled.ActionsMenuRowItemProps}>
        <DeleteOutlineIcon sx={Styled.ActionsMenuRowIconsProps} />
        Delete
      </MenuItem>
    </>
  );
};