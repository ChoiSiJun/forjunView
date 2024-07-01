import { Box, Typography } from '@mui/material';
import { fields } from '@module/cms/builder/components/BuilderSideBarItem';
import { useDraggable } from '@dnd-kit/core';

//실제 사이드바에 출력될 Item
interface SideBarItemFieldProps {
  title: string;
}

interface SideBarItemProps {
  field: SideBarItemFieldProps;
  overlay: boolean;
}
export const SideBarItem = (props: SideBarItemProps) => {
  const { field, overlay } = props;
  const { title } = field;

  let className = 'sideBar-item';

  if (overlay) {
    className += ' overlay';
  }

  return <div className={className}>{title}</div>;
};

//드래그 가능하도록 사이드바 item에 관련 속성부여
const DraggableSideBarItem = props => {
  const { field, ...rest } = props;

  //드래그 제어할 고유 ID
  const id = field.id;

  const { attributes, listeners, setNodeRef } = useDraggable({
    id: id.current,
    data: {
      field,
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
      <SideBarItem field={field} {...rest} />
    </div>
  );
};

const BuilderSidebar = props => {
  const { fieldsRegKey: string } = props;

  return (
    <Box sx={{}}>
      <Typography variant="h6">Sidebar Content</Typography>

      <div key={fieldsRegKey} className="sidebar">
        {fields.map(f => (
          <DraggableSideBarItem key={f.type} field={f} />
        ))}
      </div>

      {/* 사이드바에 원하는 콘텐츠를 추가하세요 */}
    </Box>
  );
};

export default BuilderSidebar;
