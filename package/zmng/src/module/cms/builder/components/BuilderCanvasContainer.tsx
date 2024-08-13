import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { ButtonGroup, Grid, IconButton, SvgIcon } from '@mui/material';
import { ReactNode } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { CSS } from '@dnd-kit/utilities';
import { CanvasesProps } from '@module/cms/builder/components/useBuilderDragState';

interface BuilderCanvasContainerProps {
  canvas: CanvasesProps;
  selectedCanvasId: UniqueIdentifier | undefined;
  continerUpdate: (canvasId: UniqueIdentifier, type: string) => void;
  children: ReactNode;
}

const BuilderCanvasContainer = ({
  canvas,
  selectedCanvasId,
  continerUpdate,
  children,
}: BuilderCanvasContainerProps) => {
  const isSelected = selectedCanvasId === canvas.canvasId;

  const {
    attributes,
    listeners,
    transform,
    transition,
    setNodeRef,
    setActivatorNodeRef,
  } = useSortable({
    id: canvas.canvasId,
    data: {
      dragFrom: 'mainCanvas',
    },
  });

  const overrayStyle = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #000',
    padding: '8px',
    cursor: 'move',
  };

  return (
    <Grid
      item
      lg={canvas.gird}
      md={canvas.gird}
      sm={12}
      style={{
        ...overrayStyle,
        position: 'relative',
        border: isSelected ? '2px solid #3f51b5' : '1px solid #ccc',
        borderRadius: '8px',
        margin: 10,
        boxShadow: isSelected ? '0 4px 8px rgba(0, 0, 0, 0.2)' : 'none',
        transition: 'box-shadow 0.3s ease, border 0.3s ease',
      }}
      ref={setNodeRef}
      {...attributes}
    >
      <div>{children}</div>
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
            onClick={() => continerUpdate(canvas.canvasId, 'sizeDown')}
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
            onClick={() => continerUpdate(canvas.canvasId, 'sizeUp')}
          >
            <SvgIcon component={ChevronRightIcon} fontSize="small" />
          </IconButton>
        </ButtonGroup>
      )}
    </Grid>
  );
};

export default BuilderCanvasContainer;
