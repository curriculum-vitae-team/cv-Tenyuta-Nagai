export interface ISkillUpdateModalProps {
  open: boolean;
  onClose: () => void;
  skill: {
    name: string;
    id: string;
  };
}
