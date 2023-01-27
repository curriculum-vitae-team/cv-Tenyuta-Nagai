import { yupResolver } from '@hookform/resolvers/yup';
import React, { FC } from 'react';
import { useForm } from 'react-hook-form';
import { Spinner } from '../../../components/Spinner';
import { InputSelect } from '../../../components/UI/InputSelect';
import { InputText } from '../../../components/UI/InputText';
import { ModalWindow } from '../../../components/UI/ModalWindow';
import { IEmployeesFormInput, IEmployeesModalProps } from './EmployeesModal.interface';

// export const EmployeesModal: FC<IEmployeesModalProps> = ({ userId, open, onClose }) => {
//   const { loading, error, userData, positionsData, departmentsData } = useProfileFormData(userId);

//   return <ModalWindow title={'Create user'} onClose={onClose} open={open}></ModalWindow>;
// };
