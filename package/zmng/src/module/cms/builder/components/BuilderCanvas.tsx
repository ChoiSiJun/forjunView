import {
  renderers,
  FieldType,
} from '@module/cms/builder/components/BuilderSideBarItem';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';
import { useDroppable } from '@dnd-kit/core';

function ItemRender(type: FieldType | 'spacer') {
  if (type === 'spacer') {
    return () => {
      return <div className="spacer">spacer</div>;
    };
  }

  return renderers[type] || (() => <div>No renderer found for {type}</div>);
}

export function Field(props: any) {
  const { field, overlay, ...rest } = props;
  const { type } = field;

  const Component = ItemRender(type);

  let className = 'canvas-field';
  if (overlay) {
    className += ' overlay';
  }

  return (
    <div className={className}>
      <Component {...rest} />
    </div>
  );
}

function SortableField(props: any) {
  const { id, index, field } = props;

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      data: {
        index,
        id,
        field,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <Field field={field} />
    </div>
  );
}

const BuilderCanvas = (props: any) => {
  const { fields } = props;

  //Dnd 관련설정.

  const { attributes, listeners, setNodeRef, transform, transition } =
    useDroppable({
      id: 'canvas_droppable',
      data: {
        parent: null,
        isContainer: true,
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="canvas"
      style={style}
      {...attributes}
      {...listeners}
    >
      <div className="canvas-fields">
        {fields?.map((f, i) => (
          <SortableField key={f.id} id={f.id} field={f} index={i} />
        ))}
      </div>
    </div>
  );
};

export default BuilderCanvas;
