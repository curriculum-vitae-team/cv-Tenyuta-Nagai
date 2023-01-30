export type DeleteUserInput = {
  id: string;
};

export type DeleteUserResult = {
  deleteUser: {
    affected: number;
  };
};

export type DeleteResult = {
  affected: number;
};
