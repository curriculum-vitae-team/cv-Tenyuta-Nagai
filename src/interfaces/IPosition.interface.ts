export interface IPosition {
  id: string;
  created_at: string;
  name: string;
}

export interface IPositionReturn {
  positions: IPosition[];
}
