import { UniqueIdentifier } from '@dnd-kit/core';
import { ReactNode } from 'react';
import { ItemContainerProps } from '@package/core/src/home/components/itemContainer/ItemContainerProps';
import { CanvasProps } from '@package/core/src/home/components/canvas/CanvasProps';

// 새로 만들기 시작

// Builder 인터페이스
export interface BuilderProps {
  builderId: UniqueIdentifier;
  builderType: string;
  builderFrom: string;
  builderFromId: UniqueIdentifier;
  builderSelectedId: UniqueIdentifier | undefined;
}

// Builder Item Container 인터페이스
export interface BuilderItemContainerProps
  extends ItemContainerProps,
    BuilderProps {
  continerUpdate: (canvasId: UniqueIdentifier, type: string) => void;
  children: ReactNode;
}

// Builder Item 인터페이스
export interface BuilderItemsProps extends BuilderProps {
  displayTitle: string;
  component?: ReactNode;
}

//  Canvas 인터페이스
export interface BuilderCanvasesProps extends CanvasProps {
  canvasId: UniqueIdentifier;
  items: BuilderItemsProps[];
  gird: number;
}

// Builder용 캔버스 인터페이스
interface BuilderCanvasContainerProps {
  canvas: CanvasesProps;
  selectedCanvasId: UniqueIdentifier | undefined;
  continerUpdate: (canvasId: UniqueIdentifier, type: string) => void;
  children: ReactNode;
}
