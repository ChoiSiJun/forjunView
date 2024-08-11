import { BuilderItemsProps } from '@module/cms/builder/components/BuilderItem';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';
import 'react-resizable/css/styles.css';
import { Grid } from '@mui/material';
import BuilderCanvasItem from '@module/cms/builder/components/BuilderCanvasItem';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import BuilderCanvasContainer from '@module/cms/builder/components/BuilderCanvasContainer';

// Builder Cavas에 Dnd Drop 설정
const BuilderCanvas = ({
  items,
  onDelete,
  canvasId,
  selectedItemId,
  setSelectedItemId,
  selectedCanvasId,
  setSelectedCanvasId,
}: {
  items: BuilderItemsProps[];
  onDelete: (id: UniqueIdentifier) => void;
  canvasId: UniqueIdentifier;
  selectedItemId: UniqueIdentifier;
  setSelectedItemId: (id: UniqueIdentifier) => void;
  selectedCanvasId: UniqueIdentifier | undefined;
  setSelectedCanvasId: (id: UniqueIdentifier | undefined) => void;
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
    <BuilderCanvasContainer
      canvasId={canvasId}
      selectedCanvasId={selectedCanvasId}
    >
      <Grid
        container
        spacing={0}
        ref={setNodeRef}
        className="canvas"
        style={{
          height: 'auto',
          width: '100%',
          minHeight: 100,
          alignItems: 'flex-start',
        }}
      >
        <SortableContext
          strategy={verticalListSortingStrategy}
          items={items.map(d => d.dragId)}
        >
          {items?.map((item, i) => (
            <Grid item key={item.dragId} lg={12} xs={12} sm={12} border={1}>
              <BuilderCanvasItem
                key={item.dragId}
                item={item}
                index={i}
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
                setSelectedCanvasId={setSelectedCanvasId}
                onDelete={onDelete}
              />
            </Grid>
          ))}
        </SortableContext>
      </Grid>
    </BuilderCanvasContainer>
  );
};

export default BuilderCanvas;
