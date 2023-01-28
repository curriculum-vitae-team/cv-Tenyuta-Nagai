import { UseFormRegister, FieldValues } from 'react-hook-form';
import { SxProps } from '@mui/system';
import { UserRoles } from './../../../constants/userRoles';

type TData = { id: string | UserRoles; name?: string; nameRole?: UserRoles };

export interface IInputSelectProps {
  label: string;
  registerName: string;
  register: UseFormRegister<FieldValues>;
  defaultValue: string;
  data: TData[];
  sx?: SxProps;
  size?: 'small' | 'medium' | undefined;
}
