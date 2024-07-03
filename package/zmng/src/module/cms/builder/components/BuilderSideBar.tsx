import { Box, Typography } from '@mui/material';
import {
  BuilderSideBarItems,
  BuilderSideBarItemsProps,
} from '@module/cms/builder/components/BuilderSideBarItem';
import { useDraggable } from '@dnd-kit/core';
import { useRef } from 'react';

//사이드바 컨테이너 속성
interface BuilderSidebarProps {
  fieldsRegKey: number;
}

//사이드바 Item 속성
interface DraggableSideBarItemProps {
  item: BuilderSideBarItemsProps;
}

//사이드바 Item 렌더링
interface SideBarItemRenderProps {
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
          <DraggableSideBarItem key={item.type} item={item} />
        ))}
      </div>

      {/* 사이드바에 원하는 콘텐츠를 추가하세요 */}
    </Box>
  );
};

//2. 드래그 가능하도록 사이드바 item에 관련 속성부여
const DraggableSideBarItem = ({ item }: DraggableSideBarItemProps) => {
  //드래그 제어할 고유 ID
  const id = useRef(item.id);

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      item,
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
      <SideBarItemRender item={item} />
    </div>
  );
};

//3. 사이드바 아이템 렌더링
export const SideBarItemRender = ({
  item,
  overlay = false,
}: SideBarItemRenderProps) => {
  let className = 'sidebar-field';
  if (overlay) {
    className += ' overlay';
  }

  return <div className={className}>{item.title}</div>;
};

export default BuilderSidebar;
