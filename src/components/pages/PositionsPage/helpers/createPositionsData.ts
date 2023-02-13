import { IPositionReturn } from '../../../../graphql/types/results/position';

export const createPositionsData = (data: IPositionReturn | undefined) => {
  if (!data) {
    return [];
  }

  return data.positions.map((position) => ({
    id: position.id,
    name: position.name,
  }));
};
