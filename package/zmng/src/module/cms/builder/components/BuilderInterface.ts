import { UniqueIdentifier } from '@dnd-kit/core';

import { CanvasState } from '@package/core/src/home/components/canvas/CanvasState';
import { ItemState } from '@package/core/src/home/components/item/ItemState';

// 새로 만들기 시작

// Builder 인터페이스
export interface BuilderProps {
  builderId: UniqueIdentifier;
  builderType: string;
  builderFrom?: string;
  builderFromId?: UniqueIdentifier;
  builderSelectedId?: UniqueIdentifier | undefined;
}

// Builder Canvas Props인터페이스
export interface BuilderCanvasProps extends CanvasState, BuilderProps {
  state: BuilderCanvasState;

  itemDelete: BuilderItemsProps['itemDelete'];
  selectedItemId: BuilderItemsProps['selectedItemId'];
  setSelectedItemId: BuilderItemsProps['setSelectedItemId'];

  canvasUpdate: (canvasId: BuilderProps['builderId'], type: string) => void;
  canvasDelete: (id: BuilderProps['builderId']) => void;
  selectedCanvasId: BuilderProps['builderSelectedId'];
  setSelectedCanvasId: (id: BuilderProps['builderSelectedId']) => void;
}

// Builder Item Props인터페이스
export interface BuilderItemsProps extends ItemState, BuilderProps {
  state: BuilderItemState;
  index: number;
  selectedItemId: BuilderProps['builderSelectedId'];
  setSelectedItemId: (id: BuilderProps['builderSelectedId']) => void;

  selectedCanvasId: BuilderCanvasProps['selectedCanvasId'];
  setSelectedCanvasId: BuilderCanvasProps['setSelectedCanvasId'];
  itemDelete: (id: BuilderProps['builderId']) => void;
}

// Builder Canvas 상태 인터페이스
export interface BuilderCanvasState extends CanvasState, BuilderProps {
  items: BuilderItemState[];
}

// Builder Item 상태 인터페이스
export interface BuilderItemState extends ItemState, BuilderProps {
  renderId: string;
}
