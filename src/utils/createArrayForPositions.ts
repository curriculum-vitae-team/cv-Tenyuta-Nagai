import { IPosition } from './../interfaces/IPosition.interface';

export const createArrayForPositions = (data: IPosition[] | undefined) => {
  if (!data) {
    return [];
  }

  return data.map(({ name }) => name);
};
