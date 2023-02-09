export interface IProjectsFormInput {
  [key: string]: string | number;
  name: string;
  internalName: string;
  description: string;
  domain: string;
  startDate: string;
  endDate: string;
  teamSize: number;
}
