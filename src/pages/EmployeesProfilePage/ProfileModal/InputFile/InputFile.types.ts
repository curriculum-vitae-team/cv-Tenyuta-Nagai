import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IProfileFormInput } from '../ProfileModal.types';

export interface IInputFileProps {
  children: ReactNode;
  registerName: 'picture';
  register: UseFormRegister<IProfileFormInput>;
}
