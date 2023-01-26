import { TableCell, Avatar } from '@mui/material';
import React, { FC, useEffect, useState } from 'react';
import { UserRoles } from '../../../../constants/userRoles';
import { useUser } from '../../../../hooks/useUser';
import { IColumnCellComponentProps } from '../../../../pages/EmployeesPage/TableData/TableData.interface';
import { AvatarModal } from '../../../../pages/EmployeesProfilePage/AvatarModal/AvatarModal';

const AvatarImage: FC<IColumnCellComponentProps> = ({ item }) => {
  const [isOpenAvatarModal, setIsOpenAvatarModal] = useState(false);
  const user = useUser();
  const isVisible = user?.id === item.id || user?.role === UserRoles.Admin;

  const handleOpenAvatarModal = () => {
    setIsOpenAvatarModal(true);
  };

  const handleCloseAvatarModal = () => {
    setIsOpenAvatarModal(false);
  };

  useEffect(() => {
    handleCloseAvatarModal();
  }, []);

  return (
    <>
      <TableCell>
        <Avatar
          src={item?.avatar}
          onClick={isVisible ? handleOpenAvatarModal : undefined}
          sx={{ cursor: isVisible ? 'pointer' : 'default' }}
        >
          {item.name ? item.name[0].toUpperCase() : item?.email[0].toUpperCase()}
        </Avatar>
      </TableCell>
      {isOpenAvatarModal && (
        <AvatarModal userId={item.id!} open={isOpenAvatarModal} onClose={handleCloseAvatarModal} />
      )}
    </>
  );
};

export { AvatarImage };
