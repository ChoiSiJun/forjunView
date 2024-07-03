import React, { useRef, useState } from 'react';
import { CssBaseline, Box, IconButton, Drawer } from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import BuilderCanvas, { CanvasItem } from './BuilderCanvas';
import BuilderSidebar, { SideBarItem } from './BuilderSideBar';
import { BuilderSideBarItemsProps } from '@module/cms/builder/components/BuilderSideBarItem';
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

const BuilderLayout = () => {
  //Dnd 관련 상태관리

  function createSpacer({
    id,
  }: {
    id: UniqueIdentifier;
  }): BuilderSideBarItemsProps {
    return {
      id,
      type: 'spacer',
      title: 'spacer',
    };
  }

  //캔버스에 스페이서가 들어갔는지 참조
  const spacerInsertedRef = useRef(false);

  //현재 드래그중인 아이템
  const currentDragItemRef = useRef<BuilderSideBarItemsProps | null>(null);

  //사이드바에서 드래그 시작한 활성화된 아이템
  const [activeSidebarItem, setActiveSidebarItem] = useState(null); // only for fields from the sidebar

  //캔버스에서 드래그 시작한 활성화된 아이템
  const [activeCanvesItem, setActiveCanverItem] = useState(null); // only for fields that are in the form.

  //드래그앤 드롭을 통해 변경될 필드 목록을 저장하는 필드
  const [currentItem, setCurrentItem] = useImmer<BuilderSideBarItemsProps[]>(
    [],
  );

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
    const activeData = active?.data?.current ?? {};
    console.log(activeData);
    //드래그중인 아이템에 참조를 설정
    //복사 완료는 onDragEnd 핸들러에서

    //사이드바의 아이템일 경우 복사시작.
    if (activeData.fromSidebar) {
      console.log('사이드!!');
      const { item } = activeData;
      setActiveSidebarItem(item);
      currentDragItemRef.current = item;
      return;
    } else {
      console.log('No!!사이드!!');
    }

    //캔버스의 아이템일 경우 실제 아이템 복사대신 공백만 생성해서 삽입
    const { item, index } = activeData;
    setActiveCanverItem(item);
    currentDragItemRef.current = item;

    //드래그앤 드롭을 통해 세팅되있는 필드값 변경 ( 해당 인덱스를 스페이서 객체로 교체)
    setCurrentItem(draft => {
      draft.splice(index, 1, createSpacer({ id: active.id }));
    });
  };

  //드래그중일때.
  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    const activeData = active?.data?.current ?? {};

    //사이드바 아이템이 캔버스위로 이동하는것을 감지할경우
    //스페이서 접미사가 있는 사이드바 아이템 id를 이용해서 스페이서를 생성후 캔버스에 렌더링될수있도록 배열에 값을 저장.

    //배열에 객체 생성시작.
    if (activeData.fromSidebar) {
      const overData = over?.data?.current ?? {};

      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          id: active.id + '-spacer',
        });

        setCurrentItem(draft => {
          if (!draft.length) {
            //필드목록이 없을경우 관리 배열에 스페이스 객체 삽입
            draft.push(spacer);
          } else {
            const nextIndex =
              overData.index > -1 ? overData.index : draft.length;

            draft.splice(nextIndex, 0, spacer);
          }
          spacerInsertedRef.current = true;
        });
      } else if (!over) {
        // This solves the issue where you could have a spacer handing out in the canvas if you drug
        // a sidebar item on and then off
        setCurrentItem(draft => {
          draft.filter(f => f.type !== 'spacer');
        });
        spacerInsertedRef.current = false;
      } else {
        // Since we're still technically dragging the sidebar draggable and not one of the sortable draggables
        // we need to make sure we're updating the spacer position to reflect where our drop will occur.
        // We find the spacer and then swap it with the over skipping the op if the two indexes are the same
        setCurrentItem(draft => {
          const spacerIndex = draft.findIndex(
            f => f.id === active.id + '-spacer',
          );

          const nextIndex =
            overData.index > -1 ? overData.index : draft.length - 1;

          if (nextIndex === spacerIndex) {
            return;
          }

          draft = arrayMove(draft, spacerIndex, overData.index);
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
        draft.filter(f => f.type !== 'spacer');
      });
      return;
    }

    // 스페이스 객체를 실제 아이템으로 교체해서 적용
    const nextField = currentDragItemRef.current;

    if (nextField) {
      const overData = over?.data?.current ?? {};

      setCurrentItem(draft => {
        const spacerIndex = draft.findIndex(f => f.type === 'spacer');
        draft.splice(spacerIndex, 1, nextField);

        draft = arrayMove(draft, spacerIndex, overData.index || 0);
      });
    }

    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
  };

  const items = currentItem;

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
            <BuilderCanvas items={items} />
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
            <SideBarItem overlay item={activeSidebarItem} />
          ) : null}
          {activeCanvesItem ? (
            <CanvasItem overlay item={activeCanvesItem} />
          ) : null}
        </DragOverlay>
      </DndContext>
    </Box>
  );
};

export default BuilderLayout;
