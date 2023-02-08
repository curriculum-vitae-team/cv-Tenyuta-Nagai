export interface ITestComponentProps {
  name: string;
  id: string;
  is_template: boolean;
  user: {
    profile: {
      id: string;
    };
    skills: string[];
  };
}
