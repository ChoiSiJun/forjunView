import { BuilderItemsProps } from '@module/cms/builder/components/BuilderSideBarItem';

import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';

import 'react-resizable/css/styles.css';

import { Box, Container, Grid } from '@mui/material';
import SortableItem from '@module/cms/builder/components/BuilderCanvasItem';
import { ResizableBox } from 'react-resizable';

// Builder Cavas에 Dnd Drop 설정
const BuilderCanvas = ({
  items,
  onDelete,
  canvasId,
  selectedId,
  setSelectedId,
}: {
  items: BuilderItemsProps[];
  onDelete: (id: UniqueIdentifier) => void;
  canvasId: UniqueIdentifier;
  selectedId: UniqueIdentifier;
  setSelectedId: (id: UniqueIdentifier) => void;
}) => {
  const { setNodeRef } = useDroppable({
    id: canvasId,
    data: {
      canvasId,
      parent: null,
      isContainer: true,
    },
  });

  return (
    <ResizableBox
      width={1150} // 초기 너비 설정
      height={300} // 초기 높이 설정
      minConstraints={[300, 300]} // 최소 제약 조건 설정
      maxConstraints={[1150, 300]} // 최대 제약 조건 설정
    >
      <Grid
        container
        spacing={1}
        ref={setNodeRef}
        className="canvas"
        border={1}
        height={300}
      >
        <Grid item lg={12} xs={12} sm={12}>
          {items?.map((item, i) => (
            <SortableItem
              key={item.dragId}
              item={item}
              index={i}
              selectedId={selectedId}
              setSelectedId={setSelectedId}
              onDelete={onDelete}
            />
          ))}
        </Grid>
      </Grid>
    </ResizableBox>
  );
};

export default BuilderCanvas;
