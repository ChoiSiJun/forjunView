import { BuilderItemsProps } from '@module/cms/builder/components/BuilderSideBarItem';

import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';

import 'react-resizable/css/styles.css';

import { ButtonGroup, Grid, IconButton, SvgIcon } from '@mui/material';
import SortableItem from '@module/cms/builder/components/BuilderCanvasItem';

import { useState } from 'react';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

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
  return (
    <Grid
      item
      lg={canverGridValue}
      md={canverGridValue}
      sm={12}
      style={{ position: 'relative' }}
    >
      <Grid container spacing={1} ref={setNodeRef} className="canvas">
        <Grid
          container
          style={{
            height: 'auto',
            width: '100%',
            minHeight: 100,
            alignItems: 'flex-start',
          }}
          border={2}
        >
          {items?.map((item, i) => (
            <Grid item lg={12} xs={12} sm={12} border={1}>
              <SortableItem
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
        </Grid>

        {/* 좌우 화살표 아이콘 추가 */}
        {/* 좌우 화살표 아이콘 그룹 추가 */}
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

            <IconButton size="small" onClick={continerSizeUp}>
              <SvgIcon component={ChevronRightIcon} fontSize="small" />
            </IconButton>
          </ButtonGroup>
        )}
      </Grid>
    </Grid>
  );
};

export default BuilderCanvas;
