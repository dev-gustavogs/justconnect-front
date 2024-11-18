import { ReactNode } from 'react';
import { ProfileInfos } from './UserInterface';

export interface LinkItemProps {
  name: string;
  icon: React.ElementType;
  path: string;
}
export interface NavItemProps {
  icon: React.ElementType;
  children: ReactNode;
  path?: string;
  mt?: number;
  onClick?: () => void;
}

export interface SidebarProps {
  children: ReactNode;
}

export interface SidebarContentProps {
  isOpen: boolean;
  onClose: () => void;
  isUserLoggedIn: boolean;
}
export interface SidebarHeaderProps {
  onOpen: () => void;
  user?: ProfileInfos;
}
