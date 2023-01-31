import { ReactNode } from 'react';

export interface IAdditionalButtonsMenu {
  children: ReactNode;
  onClose: () => void;
  open: boolean;
  anchorEl: Element | ((element: Element) => Element) | null | undefined;
}
