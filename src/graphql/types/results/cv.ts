import { ICv } from '../../../interfaces/ICv.interface';

export interface ICvResult {
  updateCv: ICv;
}

export interface ICvUnbindResult {
  unbindCv: ICv;
}

export interface ICvsResult {
  cvs: ICv[];
}

export interface ICvsCreateResult {
  createCv: ICv;
}

export interface ICvsDeleteResult {
  deleteCv: number;
}

export interface ICvQueryResult {
  cv: ICv;
}
