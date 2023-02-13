import { IAuthInput } from '../../service/authentication/authResult.interface.';
import { IProfileInput } from './profile';

export type CreateUserInput = {
  user: {
    auth: IAuthInput;
    profile: IProfileInput;
    cvsIds: string[];
    departmentId: string;
    positionId: string;
  };
};

export type DeleteUserInput = {
  id: string;
};
