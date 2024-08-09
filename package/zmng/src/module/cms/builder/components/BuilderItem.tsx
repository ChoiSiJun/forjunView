import { UniqueIdentifier } from '@dnd-kit/core/dist/types';
import { ReactNode } from 'react';
import MainExport from '@package/core/src/components/MainExport';

// ---------------------------인터페이스 정의
export interface BuilderItemsProps {
  dragId: UniqueIdentifier;
  dragType: string;
  displayTitle: string;
  canvasId?: UniqueIdentifier;
  component?: ReactNode;
}

interface RenderComponentProps {
  type: string;
  ComponentProps?: Record<string, any>;
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

// Builder Item 연결된 실제 컴포넌트 호출
export const CanvasItem: Record<string, RenderersProps> = {
  SearchBar: props => <MainExport.MirSearchField {...props} />,
  Toolbar: props => <MainExport.MirToolbarContent {...props} />,
};

// Canvas Builder Item 컴포넌트 렌더링
export const RenderCanvasItem = ({
  type,
  ComponentProps = {},
}: RenderComponentProps) => {
  if (CanvasItem[type]) {
    return CanvasItem[type](ComponentProps);
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
