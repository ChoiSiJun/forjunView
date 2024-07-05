import { UniqueIdentifier } from '@dnd-kit/core';
import { BuilderSideBarItemsProps } from './BuilderSideBarItem';

export interface BuilderDragSideBarItemsProps extends BuilderSideBarItemsProps {
  drag_id: UniqueIdentifier;
}
