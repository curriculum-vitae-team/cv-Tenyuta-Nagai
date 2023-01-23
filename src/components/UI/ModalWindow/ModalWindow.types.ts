import { ReactNode } from 'react';

export interface IModalWindowProps {
  children: ReactNode;
  title: ReactNode;
  open: boolean;
  onClose?: () => void;
}
