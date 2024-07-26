import { UniqueIdentifier } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { ButtonGroup, Grid, IconButton, SvgIcon } from '@mui/material';
import { ReactNode, useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

interface BuilderCanvasContainerProps {
  canvasId: UniqueIdentifier;
  selectedCanvasId: UniqueIdentifier | undefined;
  children: ReactNode;
}

const BuilderCanvasContainer = ({
  canvasId,
  selectedCanvasId,
  children,
}: BuilderCanvasContainerProps) => {
  const [canverGridValue, setCanverGridValue] = useState(12);
  const isSelected = selectedCanvasId === canvasId;

  const continerSizeDown = () => {
    if (canverGridValue > 1) {
      setCanverGridValue(canverGridValue - 1);
    } else {
      return false;
    }

    return true;
  };

  const continerSizeUp = () => {
    if (canverGridValue < 12) {
      setCanverGridValue(canverGridValue + 1);
    } else {
      return false;
    }

    return true;
  };

  const { attributes, listeners, setNodeRef, setActivatorNodeRef } =
    useSortable({
      id: canvasId,
    });

  return (
    <Grid
      item
      lg={canverGridValue}
      md={canverGridValue}
      sm={12}
      style={{ position: 'relative' }}
    >
      <div ref={setNodeRef} {...attributes}>
        {children}
      </div>
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
          <IconButton size="small" onClick={continerSizeDown}>
            <SvgIcon component={ChevronLeftIcon} fontSize="small" />
          </IconButton>

          <IconButton size="small">
            <SvgIcon component={SettingsOutlinedIcon} fontSize="small" />
          </IconButton>

          <IconButton ref={setActivatorNodeRef} size="small" {...listeners}>
            <SvgIcon component={SettingsOutlinedIcon} fontSize="small" />
          </IconButton>

          <IconButton size="small" onClick={continerSizeUp}>
            <SvgIcon component={ChevronRightIcon} fontSize="small" />
          </IconButton>
        </ButtonGroup>
      )}
    </Grid>
  );
};

export default BuilderCanvasContainer;
