import { ICv } from './ICv.interface';
import { IDepartment } from './IDepartment.interface';
import { IPosition } from './IPosition.interface';
import { IProfile } from './IProfile.interface';

export interface IUser {
  id: string;
  created_at: string;
  email: string;
  is_verified?: boolean;
  profile: IProfile;
  cvs?: ICv[];
  department?: IDepartment;
  department_name?: string;
  position?: IPosition;
  position_name?: string;
  role: string;
}
