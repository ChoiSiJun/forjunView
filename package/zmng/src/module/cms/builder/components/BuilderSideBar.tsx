import { Box, Typography } from '@mui/material';
import {
  SideBarItems,
  BuilderItemsProps,
} from '@module/cms/builder/components/BuilderItem';
import { useDraggable } from '@dnd-kit/core';
import { useRef } from 'react';
import { nanoid } from '@reduxjs/toolkit';

// 사이드바 Item 렌더링
interface SideBarItemProps {
  item: BuilderItemsProps;
  overlay?: boolean;
}

// 사이드바 아이템 렌더링
export const SideBarItem = ({ item, overlay = false }: SideBarItemProps) => {
  let className = 'sidebar-field';
  if (overlay) {
    className += ' overlay';
  }

  return <div className={className}>{item.displayTitle}</div>;
};

// 사이드바 item에 관련 속성부여
const DraggableSideBarItem = ({ item }: SideBarItemProps) => {
  // 드래그 제어할 고유 ID
  const dragId = useRef(nanoid());
  const draggableItem = { ...item, dragId: dragId.current };

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: draggableItem.dragId,
    data: {
      item: draggableItem,
      dragFrom: 'sidebar',
      fromSidebar: true,
    },
  });
  return (
    <div
      ref={setNodeRef}
      className="sidebar-field"
      {...listeners}
      {...attributes}
    >
      <SideBarItem item={draggableItem} />
    </div>
  );
};

// 사이드바 컨테이너
const BuilderSidebar = ({ fieldsRegKey }: { fieldsRegKey: number }) => {
  return (
    <Box sx={{}}>
      <Typography variant="h6">Sidebar Content</Typography>

      <div key={fieldsRegKey} className="sidebar">
        {SideBarItems.map(item => (
          <DraggableSideBarItem key={item.dragType} item={item} />
        ))}
      </div>

      {/* 사이드바에 원하는 콘텐츠를 추가하세요 */}
    </Box>
  );
};

export default BuilderSidebar;
