import { useSortable } from '@dnd-kit/sortable';
import { UniqueIdentifier } from '@dnd-kit/core';

const SortableCanvasItem = ({
  canvasId,
  children,
}: {
  canvasId: UniqueIdentifier;
  children: React.ReactNode;
}) => {
  const { attributes, listeners, setActivatorNodeRef } = useSortable({
    id: canvasId,
  });
  return (
    <div ref={setActivatorNodeRef} {...listeners} {...attributes}>
      {children}
    </div>
  );
};

export default SortableCanvasItem;
