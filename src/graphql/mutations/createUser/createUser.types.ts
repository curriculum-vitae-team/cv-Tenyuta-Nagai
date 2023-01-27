import { IProfileInput } from '../../../interfaces/IProfile.interface';
import { IUser } from '../../../interfaces/IUser.interface';
import { IAuthInput } from '../../authentication/authResult.interface.';

export type CreateUserInput = {
  user: {
    auth?: IAuthInput;
    profile: IProfileInput;
    cvsIds: string[];
    departmentId: string;
    positionId: string;
  };
};

export type CreateUserResult = {
  createUser: {
    user: IUser;
  };
};
