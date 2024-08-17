import { UniqueIdentifier } from '@dnd-kit/core/dist/types';
import { ReactNode } from 'react';
import { ItemRender } from '@package/core/src/home/components/ItemRender';
import { ItemState } from '@package/core/src/home/components/item/ItemState';

// ---------------------------인터페이스 정의
export interface BuilderItemsProps {
  dragId: UniqueIdentifier;
  dragType: string;
  displayTitle: string;
  canvasId?: UniqueIdentifier;
  component?: ReactNode;
}

interface RenderersProps {
  (props: Record<string, any>): JSX.Element;
}

// ---------------------------컴포넌트 정의

// Builder 할수있는 Item
export const SideBarItems: BuilderItemsProps[] = [
  {
    dragId: 1,
    dragType: 'SearchBar',
    displayTitle: 'SearchBar',
    component: MainExport.MirSearchField,
  },
  {
    dragId: 2,
    dragType: 'Toolbar',
    displayTitle: 'Toolbar',
    component: MainExport.MirToolbarContent,
  },
];

// Canvas Builder Item 컴포넌트 렌더링
export const RenderCanvasItem = ({ type, ComponentProps = {} }: ItemState) => {
  if (ItemRender[type]) {
    return ItemRender[type](ComponentProps);
  }

  return <div>Unknown component type: {type}</div>;
};

// Canvas Builder Item 컴포넌트 렌더링
export const RenderSidebarItem = ({
  className,
  displayTitle,
}: {
  className: string;
  displayTitle: string;
}) => {
  return <div className={className}>{displayTitle}</div>;
};
