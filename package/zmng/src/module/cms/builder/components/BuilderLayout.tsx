import React, { useRef, useState } from 'react';
import { CssBaseline, Box, IconButton, Drawer } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import BuilderCanvas, { CanvasItemRender } from './BuilderCanvas';
import BuilderSidebar, { SideBarItemRender } from './BuilderSideBar';
import {
  DndContext,
  DragOverlay,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  UniqueIdentifier,
} from '@dnd-kit/core';
import { useImmer } from 'use-immer';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import BuilderSettingBar from './BuilderSettingBar';
import BuilderDndMonitor from './BuilderDndMonitor';

const SidebarWidth = 340;
const AppBarHeight = 64;

function createSpacer({ id }: any) {
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
    id: UniqueIdentifier;
    type: string;
    name: string;
    parent: string | null;
  }

  //현재 드래그중인 아이템
  const currentDragItemRef = useRef<DragField | null>(null);

  //사이드바에서 드래그중인 활성화된 필드
  const [activeSidebarItem, setActiveSidebarItem] = useState(null); // only for fields from the sidebar

  //캔버스에서 드래그중인 필드
  const [activeCanvesItem, setActiveCanverItem] = useState(null); // only for fields that are in the form.

  //드래그앤 드롭을 통해 변경될 필드 목록을 저장하는 필드
  const [currentItem, setCurrentItem] = useImmer({
    items: [],
  });

  //초기화 해주는 함수
  const cleanUp = () => {
    setActiveSidebarItem(null);
    setActiveCanverItem(null);
    currentDragItemRef.current = null;
    spacerInsertedRef.current = false;
  };

  //드래그 시작
  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    const activeItem = active?.data?.current ?? {};

    // This is where the cloning starts.
    // This Long time COns
    // We set up a ref to the field we're dragging
    // from the sidebar so that we can finish the clone
    // in the onDragEnd handler.
    if (activeItem.fromSidebar) {
      const { item } = activeItem;
      const { type } = item;
      setActiveSidebarItem(item);
      // Create a new field that'll be added to the fields array
      // if we drag it over the canvas.

      currentDragItemRef.current = {
        id: active.id,
        type,
        name: `${type}${items.length + 1}`,
        parent: null,
      };
      return;
    }

    // We aren't creating a new element so go ahead and just insert the spacer
    // since this field already belongs to the canvas.
    const { item, index } = activeItem;

    setActiveCanverItem(item);
    currentDragItemRef.current = item;

    setCurrentItem(draft => {
      draft.items.splice(index, 1, createSpacer({ id: active.id }));
    });
  };

  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    const activeData = active?.data?.current ?? {};

    // Once we detect that a sidebar field is being moved over the canvas
    // we create the spacer using the sidebar fields id with a spacer suffix and add into the
    // fields array so that it'll be rendered on the canvas.

    // 🐑 CLONING 🐑
    // This is where the clone occurs. We're taking the id that was assigned to
    // sidebar field and reusing it for the spacer that we insert to the canvas.
    if (activeData.fromSidebar) {
      const overData = over?.data?.current ?? {};

      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          id: active.id + '-spacer',
        });

        setCurrentItem(draft => {
          if (!draft.items.length) {
            draft.items.push(spacer);
          } else {
            const nextIndex =
              overData.index > -1 ? overData.index : draft.items.length;

            draft.items.splice(nextIndex, 0, spacer);
          }
          spacerInsertedRef.current = true;
        });
      } else if (!over) {
        // This solves the issue where you could have a spacer handing out in the canvas if you drug
        // a sidebar item on and then off
        setCurrentItem(draft => {
          draft.items = draft.items.filter(f => f.type !== 'spacer');
        });
        spacerInsertedRef.current = false;
      } else {
        // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
        // we need to make sure we're updating the spacer position to reflect where our drop will occur.
        // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
        setCurrentItem(draft => {
          const spacerIndex = draft.items.findIndex(
            f => f.id === active.id + '-spacer',
          );

          const nextIndex =
            overData.index > -1 ? overData.index : draft.items.length - 1;

          if (nextIndex === spacerIndex) {
            return;
          }

          draft.items = arrayMove(draft.items, spacerIndex, overData.index);
        });
      }
    }
  };

  const handleDragEnd = (e: DragEndEvent) => {
    const { over } = e;

    // We dropped outside of the over so clean up so we can start fresh.
    if (!over) {
      cleanUp();
      setCurrentItem(draft => {
        draft.items = draft.items.filter(f => f.type !== 'spacer');
      });
      return;
    }

    // This is where we commit the clone.
    // We take the field from the this ref and replace the spacer we inserted.
    // Since the ref just holds a reference to a field that the context is aware of
    // we just swap out the spacer with the referenced field.
    const nextField = currentDragFieldRef.current;

    if (nextField) {
      const overData = over?.data?.current ?? {};

      setCurrentItem(draft => {
        const spacerIndex = draft.items.findIndex(f => f.type === 'spacer');
        draft.items.splice(spacerIndex, 1, nextField);

        draft.items = arrayMove(draft.items, spacerIndex, overData.index || 0);
      });
    }

    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
  };

  const { items } = currentItem;

  //사이드바 필드리스트를 생성하기위한 키 ( 현재 사이드바의 상태키 )
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
            items={items.map(f => f.id)}
          >
            <BuilderCanvas fields={items} />
          </SortableContext>
        </Box>

        {
          //////사이드바 활성화 버튼
        }
        <IconButton
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

        {
          //////사이드바 영역
        }
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
          // 드래그 OverRay 설정
        }
        <DragOverlay dropAnimation={null}>
          {activeSidebarItem ? (
            <SideBarItemRender overlay item={activeSidebarItem} />
          ) : null}
          {activeCanvesItem ? (
            <CanvasItemRender overlay field={activeCanvesItem} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default BuilderLayout;
