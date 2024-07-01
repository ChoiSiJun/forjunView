import React, { useRef, useState } from 'react';
import { CssBaseline, Box, IconButton, Drawer } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import BuilderCanvas, { Field } from './BuilderCanvas';
import BuilderSidebar, { SideBarItem } from './BuilderSideBar';
import { DndContext, DragOverlay } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { fields } from '@module/cms/builder/components/BuilderSideBarItem';

import BuilderSettingBar from './BuilderSettingBar';
import BuilderDndMonitor from './BuilderDndMonitor';

const SidebarWidth = 340;
const AppBarHeight = 64;

function getData(prop: any) {
  return prop?.data?.current ?? {};
}

function createSpacer({ id }) {
  return {
    id,
    type: 'spacer',
    title: 'spacer',
  };
}

const BuilderLayout = () => {
  //Dnd 관련 상태관리

  //캔버스에 스페이서가 들어갔는지 참조
  const spacerInsertedRef = useRef(false);

  //현재 드래그중인 필드를 참조

  interface DragField {
    id: string;
    type: string;
    name: string;
    parent: string | null;
  }

  const currentDragFieldRef = useRef<DragField | null>(null);

  //사이드바에서 드래그중인 활성화된 필드
  const [activeSidebarField, setActiveSidebarField] = useState(null); // only for fields from the sidebar

  //캔버스에서 드래그중인 필드
  const [activeField, setActiveField] = useState(null); // only for fields that are in the form.

  //드래그앤 드롭을 통해 변경될 필드 목록을 저장하는 필드
  const [data, updateData] = useImmer({
    fields: [],
  });

  //초기화 해주는 함수
  const cleanUp = () => {
    setActiveSidebarField(null);
    setActiveField(null);
    currentDragFieldRef.current = null;
    spacerInsertedRef.current = false;
  };

  //드래그 시작
  const handleDragStart = (e: any) => {
    const { active } = e;
    const activeData = getData(active);

    // This is where the cloning starts.
    // This Long time COns
    // We set up a ref to the field we're dragging
    // from the sidebar so that we can finish the clone
    // in the onDragEnd handler.
    if (activeData.fromSidebar) {
      const { field } = activeData;
      const { type } = field;
      setActiveSidebarField(field);
      // Create a new field that'll be added to the fields array
      // if we drag it over the canvas.

      currentDragFieldRef.current = {
        id: active.id,
        type,
        name: `${type}${fields.length + 1}`,
        parent: null,
      };
      return;
    }

    // We aren't creating a new element so go ahead and just insert the spacer
    // since this field already belongs to the canvas.
    const { field, index } = activeData;

    setActiveField(field);
    currentDragFieldRef.current = field;
    updateData(draft => {
      draft.fields.splice(index, 1, createSpacer({ id: active.id }));
    });
  };

  const handleDragOver = e => {
    const { active, over } = e;
    const activeData = getData(active);

    // Once we detect that a sidebar field is being moved over the canvas
    // we create the spacer using the sidebar fields id with a spacer suffix and add into the
    // fields array so that it'll be rendered on the canvas.

    // 🐑 CLONING 🐑
    // This is where the clone occurs. We're taking the id that was assigned to
    // sidebar field and reusing it for the spacer that we insert to the canvas.
    if (activeData.fromSidebar) {
      const overData = getData(over);

      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          id: active.id + '-spacer',
        });

        updateData(draft => {
          if (!draft.fields.length) {
            draft.fields.push(spacer);
          } else {
            const nextIndex =
              overData.index > -1 ? overData.index : draft.fields.length;

            draft.fields.splice(nextIndex, 0, spacer);
          }
          spacerInsertedRef.current = true;
        });
      } else if (!over) {
        // This solves the issue where you could have a spacer handing out in the canvas if you drug
        // a sidebar item on and then off
        updateData(draft => {
          draft.fields = draft.fields.filter(f => f.type !== 'spacer');
        });
        spacerInsertedRef.current = false;
      } else {
        // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
        // we need to make sure we're updating the spacer position to reflect where our drop will occur.
        // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
        updateData(draft => {
          const spacerIndex = draft.fields.findIndex(
            f => f.id === active.id + '-spacer',
          );

          const nextIndex =
            overData.index > -1 ? overData.index : draft.fields.length - 1;

          if (nextIndex === spacerIndex) {
            return;
          }

          draft.fields = arrayMove(draft.fields, spacerIndex, overData.index);
        });
      }
    }
  };

  const handleDragEnd = e => {
    const { over } = e;

    // We dropped outside of the over so clean up so we can start fresh.
    if (!over) {
      cleanUp();
      updateData(draft => {
        draft.fields = draft.fields.filter(f => f.type !== 'spacer');
      });
      return;
    }

    // This is where we commit the clone.
    // We take the field from the this ref and replace the spacer we inserted.
    // Since the ref just holds a reference to a field that the context is aware of
    // we just swap out the spacer with the referenced field.
    const nextField = currentDragFieldRef.current;

    if (nextField) {
      const overData = getData(over);

      updateData(draft => {
        const spacerIndex = draft.fields.findIndex(f => f.type === 'spacer');
        draft.fields.splice(spacerIndex, 1, nextField);

        draft.fields = arrayMove(
          draft.fields,
          spacerIndex,
          overData.index || 0,
        );
      });
    }

    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
  };

  const { fields } = data;

  //사이드바 필드리스트를 생성하기위한 키
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
    Date.now(),
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', flexGrow: 1 }}>
      <CssBaseline />

      <BuilderSettingBar AppBarHeight={AppBarHeight} />

      {
        //해당 영역부터 드래그가능
      }
      <DndContext
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
        autoScroll
      >
        <BuilderDndMonitor />
        <Box
          component="main"
          sx={{
            transition: theme =>
              theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
            width: isSidebarOpen ? `calc(100% - ${SidebarWidth}px)` : '100%',
            marginRight: !isSidebarOpen ? `-${SidebarWidth - 40}px` : 0,
            marginLeft: '80px',
            marginTop: `${AppBarHeight}px`, // 앱바 높이만큼 상단 여백 추가
          }}
        >
          <SortableContext
            strategy={verticalListSortingStrategy}
            items={fields.map(f => f.id)}
          >
            <BuilderCanvas fields={fields} />
          </SortableContext>

          <DragOverlay dropAnimation={null}>
            {activeSidebarField ? (
              <SideBarItem overlay field={activeSidebarField} />
            ) : null}
            {activeField ? <Field overlay field={activeField} /> : null}
          </DragOverlay>
        </Box>

        <IconButton //우측 콘텐츠바 버튼
          color="inherit"
          aria-label="open drawer"
          onClick={handleSideBar}
          edge="end"
          sx={{
            position: 'fixed',
            top: 100,
            right: 36,
            zIndex: 1300,
            display: isSidebarOpen ? 'none' : 'block',
          }}
        >
          <AddCircleRoundedIcon fontSize="large" />
        </IconButton>

        <Drawer
          variant="persistent"
          anchor="right"
          open={isSidebarOpen}
          sx={{
            width: SidebarWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: SidebarWidth,
              top: `${AppBarHeight + 10}px`,
              boxSizing: 'border-box',
            },
          }}
        >
          <BuilderSidebar fieldsRegKey={sidebarFieldsRegenKey} />
        </Drawer>

        {
          //드래그가능 영역 종료
        }
      </DndContext>
    </Box>
  );
};

export default BuilderLayout;

function useImmer(arg0: { fields: never[] }): [any, any] {
  throw new Error('Function not implemented.');
}
