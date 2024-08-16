import 'react-resizable/css/styles.css';
import { ButtonGroup, Grid, IconButton, SvgIcon } from '@mui/material';
import BuilderCanvasItem from '@module/cms/builder/components/BuilderCanvasItem';

import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { BuilderCanvasProps } from '@module/cms/builder/components/BuilderInterface';
import { useDroppable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

// Builder Cavas에 Dnd Drop 설정
const BuilderCanvas = ({
  state,
  itemDelete,
  selectedItemId,
  setSelectedItemId,

  canvasUpdate,
  canvasDelete,
  selectedCanvasId,
  setSelectedCanvasId,
}: BuilderCanvasProps) => {
  const { builderId, items } = state;
  const isSelected = selectedCanvasId === builderId;

  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef: sortableRef,
    setActivatorNodeRef,
  } = useSortable({
    id: builderId,
    data: {
      dragFrom: 'layout',
    },
  });

  const canvasOverrayStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #000',
    padding: '8px',
    cursor: 'move',
  };

  const { setNodeRef: droppableNodeRef } = useDroppable({
    id: builderId,
    data: {
      parent: null,
      isContainer: true,
    },
  });

  return (
    <Grid
      item
      lg={state.gird}
      md={state.gird}
      sm={12}
      style={{
        ...canvasOverrayStyle,
        position: 'relative',
        border: isSelected ? '2px solid #3f51b5' : '1px solid #ccc',
        borderRadius: '10px',
        margin: 0,
        boxShadow: isSelected ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
        transition: 'box-shadow 0.3s ease, border 0.3s ease',
      }}
      ref={sortableRef}
      {...attributes}
    >
      <Grid
        container
        spacing={0}
        ref={droppableNodeRef}
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
          items={items.map(d => d.builderId)}
        >
          {items?.map((item, i) => (
            <Grid item key={item.builderId} lg={12} xs={12} sm={12} border={1}>
              <BuilderCanvasItem
                key={item.builderId}
                state={state}
                index={i}
                selectedItemId={selectedItemId}
                setSelectedItemId={setSelectedItemId}
                setSelectedCanvasId={setSelectedCanvasId}
                itemDelete={itemDelete}
              />
            </Grid>
          ))}
        </SortableContext>
      </Grid>

      {isSelected && (
        <ButtonGroup
          variant="contained"
          color="primary"
          style={{
            position: 'absolute',
            top: -30, // Adjust as needed for spacing
            left: '50%',
            transform: 'translateX(-50%)', // Center horizontally
            zIndex: 10,
            gap: '8px', // Space between buttons
          }}
        >
          <IconButton
            size="small"
            onClick={() => canvasUpdate(builderId, 'sizeDown')}
          >
            <SvgIcon component={ChevronLeftIcon} fontSize="small" />
          </IconButton>

          <IconButton size="small">
            <SvgIcon component={SettingsOutlinedIcon} fontSize="small" />
          </IconButton>

          <IconButton ref={setActivatorNodeRef} {...listeners} size="small">
            <SvgIcon component={SettingsOutlinedIcon} fontSize="small" />
          </IconButton>

          <IconButton
            size="small"
            onClick={() => canvasUpdate(builderId, 'sizeUp')}
          >
            <SvgIcon component={ChevronRightIcon} fontSize="small" />
          </IconButton>
        </ButtonGroup>
      )}
    </Grid>
  );
};

export default BuilderCanvas;
