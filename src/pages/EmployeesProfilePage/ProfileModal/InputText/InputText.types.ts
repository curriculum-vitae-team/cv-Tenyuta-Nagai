import { UseFormRegister } from 'react-hook-form';
import { IProfileFormInput, TInputTextType } from '../ProfileModal.types';

export interface IInputTextProps {
  name: string;
  registerName: TInputTextType;
  register: UseFormRegister<IProfileFormInput>;
}
