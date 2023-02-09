import { ApolloCache, NormalizedCacheObject } from '@apollo/client';
import { POSITIONS } from '../queries/positions';
import { IPositionCreateReturn, IPositionReturn } from '../types/results/position';

export const updateCacheAfterCreatingPosition = (
  cache: ApolloCache<NormalizedCacheObject>,
  data?: IPositionCreateReturn
) => {
  const allPositions = cache.readQuery<IPositionReturn>({ query: POSITIONS });

  if (allPositions) {
    cache.writeQuery({
      query: POSITIONS,
      data: {
        positions: [data?.createPosition, ...allPositions.positions],
      },
    });
  }
};
