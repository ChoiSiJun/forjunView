import {
  renderers,
  BuilderSideBarItemsProps,
} from '@module/cms/builder/components/BuilderSideBarItem';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

import { Box } from '@mui/material';

interface CanvasItemProps {
  item: BuilderSideBarItemsProps;
  overlay?: boolean;
}

// Item 실제 렌더링 데이터 가져오기
function CanvasItemRender(type: string) {
  if (type === 'spacer') {
    return () => {
      return <Box border={1} height={100} bgcolor="gray" className="spacer" />;
    };
  }

  return renderers[type];
}

export function CanvasItem({ item, overlay = false }: CanvasItemProps) {
  const Component = CanvasItemRender(item.dragType);

  let className = 'canvas-field';
  if (overlay) {
    className += ' overlay';
  }

  return (
    <div className={className}>
      <Component />
    </div>
  );
}

function SortableItem({
  item,
  index,
}: {
  item: BuilderSideBarItemsProps;
  index: number;
}) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: item.dragId,
      data: {
        index,
        item,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <CanvasItem item={item} />
    </div>
  );
}

const BuilderCanvas = ({ items }: { items: BuilderSideBarItemsProps[] }) => {
  // Dnd 관련설정.

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
          <SortableItem key={item.dragId} item={item} index={i} />
        ))}
      </div>
    </Box>
  );
};

export default BuilderCanvas;
