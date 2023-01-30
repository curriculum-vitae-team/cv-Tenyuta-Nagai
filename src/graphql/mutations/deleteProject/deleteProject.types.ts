export type DeleteProjectInput = {
  id: string;
};

export type DeleteProjectResult = {
  deleteProject: {
    affected: number;
  };
};

export type DeleteResult = {
  affected: number;
};
