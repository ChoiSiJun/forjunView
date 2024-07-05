import { Box, Typography } from '@mui/material';
import {
  BuilderSideBarItems,
  BuilderSideBarItemsProps,
} from '@module/cms/builder/components/BuilderSideBarItem';
import { useDraggable } from '@dnd-kit/core';
import { useRef } from 'react';
import { nanoid } from '@reduxjs/toolkit';

//사이드바 컨테이너 속성
interface BuilderSidebarProps {
  fieldsRegKey: number;
}

//사이드바 Item 렌더링
interface SideBarItemProps {
  item: BuilderSideBarItemsProps;
  overlay?: boolean;
}

// 1. 사이드바 컨테이너
const BuilderSidebar = ({ fieldsRegKey }: BuilderSidebarProps) => {
  return (
    <Box sx={{}}>
      <Typography variant="h6">Sidebar Content</Typography>

      <div key={fieldsRegKey} className="sidebar">
        {BuilderSideBarItems.map(item => (
          <DraggableSideBarItem key={item.dragType} item={item} />
        ))}
      </div>

      {/* 사이드바에 원하는 콘텐츠를 추가하세요 */}
    </Box>
  );
};

//2. 사이드바 item에 관련 속성부여
const DraggableSideBarItem = ({ item }: SideBarItemProps) => {
  //드래그 제어할 고유 ID
  const dragId = useRef(nanoid());
  const draggableItem = { ...item, dragId: dragId.current };

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: draggableItem.dragId,
    data: {
      item: draggableItem,
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

//3. 사이드바 아이템 렌더링
export const SideBarItem = ({ item, overlay = false }: SideBarItemProps) => {
  let className = 'sidebar-field';
  if (overlay) {
    className += ' overlay';
  }

  return <div className={className}>{item.component.title}</div>;
};

export default BuilderSidebar;
