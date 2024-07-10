import {
  BuilderItemsProps,
  RenderComponent,
} from '@module/cms/builder/components/BuilderSideBarItem';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier, useDroppable } from '@dnd-kit/core';

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DragIndicatorOutlinedIcon from '@mui/icons-material/DragIndicatorOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';

import { Box, ButtonGroup, IconButton, SvgIcon, useTheme } from '@mui/material';
import { useState } from 'react';

interface CanvasItemProps {
  item: BuilderItemsProps;
  overlay?: boolean;
}

// Builder Canvas에 컴포넌트 렌더링 수행
export function CanvasItem({ item, overlay = false }: CanvasItemProps) {
  const Component =
    item.dragType === 'spacer' ? (
      <Box border={1} height={100} bgcolor="gray" className="spacer" />
    ) : (
      <Box>
        <RenderComponent type={item.dragType} />
      </Box>
    );

  let className = 'canvas-field';
  if (overlay) {
    className += ' overlay';
  }

  return <div className={className}>{Component}</div>;
}
// Dnd 아이템에 소트 및 드래그 설정
function SortableItem({
  item,
  index,
  selectedId,
  setSelectedId,
  onDelete,
}: {
  item: BuilderItemsProps;
  index: number;
  selectedId: UniqueIdentifier;
  setSelectedId: (id: UniqueIdentifier) => void;
  onDelete: (id: UniqueIdentifier) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    setActivatorNodeRef,
  } = useSortable({
    id: item.dragId,
    data: {
      index,
      item,
    },
  });

  // 클릭이 되는 기준은... 아무것도 선택한 상태가 아닐때.
  const isSelected = selectedId === item.dragId;
  const theme = useTheme();

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: isSelected ? `2px dashed ${theme.palette.primary.main}` : 'none', // 선택 시 테두리 스타일
    position: 'relative' as 'relative', // 드래그 핸들 위치를 위한 상대 위치 설정
  };

  const HandleDragItemClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedId(item.dragId === selectedId ? 'NOT_SELECTED' : item.dragId);
    // 컴포넌트 속성창 옆으로 띄우기.
    e.stopPropagation(); // 부모 요소로 이벤트가 전파되는 것을 방지
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onClick={HandleDragItemClick}
    >
      {/* 드래그 핸들 */}
      {isSelected && (
        <ButtonGroup
          variant="contained"
          color="primary"
          style={{
            height: '20px',
            position: 'absolute',
            top: -0,
            right: 0,
            zIndex: 1,
            cursor: 'move',
          }}
        >
          <IconButton size="small">
            <SvgIcon
              component={SettingsOutlinedIcon}
              inheritViewBox
              fontSize="small"
              color="secondary"
            />
          </IconButton>

          <IconButton ref={setActivatorNodeRef} size="small" {...listeners}>
            <SvgIcon
              component={DragIndicatorOutlinedIcon}
              inheritViewBox
              fontSize="small"
              color="secondary"
            />
          </IconButton>

          <IconButton onClick={() => onDelete(item.dragId)}>
            <SvgIcon
              component={DeleteOutlineIcon}
              inheritViewBox
              fontSize="small"
              color="secondary"
            />
          </IconButton>
        </ButtonGroup>
      )}

      <CanvasItem item={item} />
    </div>
  );
}

// Builder Cavas에 Dnd Drop 설정
const BuilderCanvas = ({
  items,
  onDelete,
}: {
  items: BuilderItemsProps[];
  onDelete: (id: UniqueIdentifier) => void;
}) => {
  const [selectedId, setSelectedId] =
    useState<UniqueIdentifier>('NOT_SELECTED');

  const { setNodeRef } = useDroppable({
    id: 'canvas_droppable',
    data: {
      parent: null,
      isContainer: true,
    },
  });

  return (
    <Box ref={setNodeRef} className="canvas" border={3} height={1000}>
      <div className="canvas-fields">
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
      </div>
    </Box>
  );
};

export default BuilderCanvas;
