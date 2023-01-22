import { UseFormRegister } from 'react-hook-form';
import { IPosition } from '../../../../interfaces/IPosition.interface';
import { IProfileFormInput, TInputSelectType } from '../ProfileModal.types';

type TData = {
  id: string;
  name: string;
};

export interface IInputSelectProps {
  label: string;
  registerName: TInputSelectType;
  register: UseFormRegister<IProfileFormInput>;
  defaultValue: string;
  data: IPosition[] | TData[];
}
