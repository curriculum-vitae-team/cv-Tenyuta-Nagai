import { ReactNode } from 'react';
import { UseFormRegister } from 'react-hook-form';
import { IAvatarForm } from '../AvatarModal.types';

export interface IInputFileProps {
  children: ReactNode;
  registerName: 'picture';
  register: UseFormRegister<IAvatarForm>;
}
