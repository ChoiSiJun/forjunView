import React, { useRef, useState } from 'react';
import {
  CssBaseline,
  Box,
  IconButton,
  Drawer,
  Button,
  Container,
  Grid,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import BuilderCanvas from '@module/cms/builder/components/BuilderCanvas';
import BuilderSidebar, {
  SideBarItem,
} from '@module/cms/builder/components/BuilderSideBar';
import { BuilderItemsProps } from '@module/cms/builder/components/BuilderSideBarItem';
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

import BuilderSettingBar from '@module/cms/builder/components/BuilderSettingBar';
import BuilderDndMonitor from '@module/cms/builder/components/BuilderDndMonitor';
import { CanvasItem } from '@module/cms/builder/components/BuilderCanvasItem';

const SidebarWidth = 340;
const AppBarHeight = 64;

// 기능
const handleHeaderSelect = () => {
  alert('헤더 선택');
};

const handleFooterSelect = () => {
  alert('푸터 선택');
};

const BuilderLayout = () => {
  // ---------------------------------------------------------------------캔버스 관리시작
  interface CanvasesProps {
    canvasId: UniqueIdentifier;
    items: BuilderItemsProps[];
  }
  const [canvases, setCanvases] = useImmer<CanvasesProps[]>([]);

  // 캔버스 추가
  const addCanvas = () => {
    setCanvases(draft => {
      draft.push({ canvasId: `canvas-${Date.now()}`, items: [] });
      return draft;
    });
  };

  // 캔버스 삭제
  const removeCanvas = (canvasId: UniqueIdentifier) => {
    setCanvases(draft => {
      return draft.filter(canvas => canvas.canvasId !== canvasId);
    });
  };
  // --------------------------------------------------------------------캔버스 관리 끝

  // 캔버스에 스페이서가 들어갔는지 참조
  const spacerInsertedRef = useRef(false);

  // 새로운 캔버스로 이동했는지 체크
  const newCanvasMoveCheckRef = useRef(false);

  // 현재 위치하고 있는 캔버스 ID
  const currentOverCanvesIdRef = useRef<UniqueIdentifier | undefined>(
    undefined,
  );

  // 현재 드래그중인 아이템
  const currentDragItemRef = useRef<BuilderItemsProps | null>(null);

  // 사이드바에서 드래그 시작한 활성화된 아이템
  const [activeSidebarItem, setActiveSidebarItem] = useState(null); // only for fields from the sidebar

  // 캔버스에서 드래그 시작한 활성화된 아이템
  const [activeCanvesItem, setActiveCanverItem] = useState(null); // only for fields that are in the form.

  // 사이드바 필드리스트를 생성하기위한 키 ( 현재 사이드바의 상태키 -> 컴포넌트 사용후 고유 ID 리셋하기 위해 제어 )
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
    Date.now(),
  );

  // 사이드바 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 사이드바 오픈
  const handleSideBar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // 클릭한 캔버스 제어
  const [selectedCanvasId, setSelectedCanvasId] = useState<
    UniqueIdentifier | undefined
  >('NOT_SELECTED');

  // 클릭한 아이템 제어
  const [selectedItemId, setSelectedItemId] =
    useState<UniqueIdentifier>('NOT_SELECTED');

  // 상태 초기화
  const cleanUp = () => {
    setActiveSidebarItem(null);
    setActiveCanverItem(null);
    currentDragItemRef.current = null;
    spacerInsertedRef.current = false;
    currentOverCanvesIdRef.current = undefined;
  };

  // -------------------------------------------------------------------스페이스 컴포넌트 관리
  // 스페이서 객체 생성
  function createSpacer({
    dragId,
    canvasId,
  }: {
    dragId: UniqueIdentifier;
    canvasId: UniqueIdentifier | undefined;
  }): BuilderItemsProps {
    return {
      dragId,
      dragType: 'spacer',
      displayTitle: 'spacer',
      canvasId,
    };
  }

  const cleanSpacer = () => {
    // 스페이서 객체 삭제 및 초기화
    setCanvases(draft => {
      draft.forEach(canvas => {
        canvas.items = canvas.items.filter(d => d.dragType !== 'spacer');
      });
    });
    spacerInsertedRef.current = false;
  };
  // -----------------------------------------------------------------스페이스 컴포넌트 관리 끝

  // ----------------------------------------------------------------- 드래그 관리 시작
  // 드래그 시작
  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    const activeData = active?.data?.current ?? {};

    newCanvasMoveCheckRef.current = false;

    // 드래그중인 아이템에 참조를 설정
    // 복사 완료는 onDragEnd 핸들러에서

    // 사이드바의 아이템일 경우 복사시작.

    if (activeData.fromSidebar) {
      const { item } = activeData;
      setActiveSidebarItem(item);
      currentDragItemRef.current = item;
      return;
    }

    // 캔버스의 아이템일 경우 실제 아이템 복사대신 공백만 생성해서 삽입 & 캔버스 아이템의 캔버스 ID를 기본으로 세팅
    const { item, index } = activeData;
    setActiveCanverItem(item);
    currentDragItemRef.current = item;

    // 시작 캔버스값은 아이템의 Canves ID
    currentOverCanvesIdRef.current = item.canvasId;

    // 드래그앤 드롭을 통해 세팅되있는 필드값 변경 ( 해당 인덱스를 스페이서 객체로 교체)
    setCanvases(draft => {
      const canvas = draft.find(
        c => c.canvasId === currentOverCanvesIdRef.current,
      );
      if (canvas) {
        canvas.items.splice(
          index,
          1,
          createSpacer({ dragId: active.id, canvasId: canvas.canvasId }),
        );
      }
    });
  };

  // 드래그중일때.
  const handleDragOver = (e: DragOverEvent) => {
    const { active, over } = e;
    const activeData = active?.data?.current ?? {};

    // Over 대상이 컨버스 일경우. currentOverCanvesIdRef 변경
    if (over?.data?.current?.canvasId) {
      if (currentOverCanvesIdRef.current !== over.data.current.canvasId) {
        cleanSpacer();
        if (currentOverCanvesIdRef.current !== undefined) {
          newCanvasMoveCheckRef.current = true;
        }
      }
      currentOverCanvesIdRef.current = over?.data?.current?.canvasId;
    }

    // Over 대상이 아이템 일경우 아이템의 CanvesItem으로 변경.
    if (over?.data?.current?.item?.canvasId) {
      if (currentOverCanvesIdRef.current !== over.data.current.item.canvasId) {
        cleanSpacer();
        if (currentOverCanvesIdRef.current !== undefined) {
          newCanvasMoveCheckRef.current = true;
        }
      }
      currentOverCanvesIdRef.current = over.data.current.item.canvasId;
    }

    if (newCanvasMoveCheckRef.current) {
      cleanSpacer();
    }

    // 사이드바 아이템이 캔버스위로 이동하는것을 감지할경우
    // 스페이서 접미사가 있는 사이드바 아이템 id를 이용해서 스페이서를 생성후 캔버스에 렌더링될수있도록 배열에 값을 저장.
    // 배열에 객체 생성시작.
    if (activeData.fromSidebar || newCanvasMoveCheckRef.current) {
      // 현재 마우스가 위치한 데이터
      const overData = over?.data?.current ?? {};
      if (!spacerInsertedRef.current) {
        const spacer = createSpacer({
          dragId: `${active.id}-spacer`,
          canvasId: currentOverCanvesIdRef.current,
        });

        setCanvases(draft => {
          const canvas = draft.find(
            c => c.canvasId === currentOverCanvesIdRef.current,
          );

          if (canvas) {
            if (!canvas.items.length) {
              canvas.items.push(spacer);
            } else {
              const nextIndex =
                overData.index > -1 ? overData.index : canvas.items.length;
              canvas.items.splice(nextIndex, 0, spacer);
            }
            spacerInsertedRef.current = true;
          }
        });
      } else if (!over) {
        cleanSpacer();
        currentOverCanvesIdRef.current = undefined;
      } else {
        // 실질적으로 캔버스별 아이템을 스페이서로 교체해서 렌더링

        setCanvases(draft => {
          const canvas = draft.find(
            c => c.canvasId === currentOverCanvesIdRef.current,
          );
          if (canvas) {
            const spacerIndex = canvas.items.findIndex(
              d => d.dragId === `${active.id}-spacer`,
            );
            const nextIndex =
              overData.index > -1 ? overData.index : canvas.items.length - 1;

            if (nextIndex !== spacerIndex) {
              canvas.items = arrayMove(canvas.items, spacerIndex, nextIndex);
            }
          }
        });
      }
    }
  };

  // 드래그 종료시
  const handleDragEnd = (e: DragEndEvent) => {
    const { over } = e;

    // We dropped outside of the over so clean up so we can start fresh.
    if (!over) {
      cleanUp();
      setCanvases(draft => {
        draft.forEach(canvas => {
          canvas.items = canvas.items.filter(f => f.dragType !== 'spacer');
        });
      });
      return;
    }

    // 스페이스 객체를 실제 아이템으로 교체해서 적용

    const nextField = {
      ...currentDragItemRef.current!,
      canvasId: currentOverCanvesIdRef.current,
    };

    if (nextField) {
      // 스페이스 객체를 의미..
      const overData = over?.data?.current ?? {};
      setCanvases(draft => {
        const canvas = draft.find(
          c => c.canvasId === currentOverCanvesIdRef.current,
        );

        if (canvas) {
          const spacerIndex = canvas.items.findIndex(
            d => d.dragType === 'spacer',
          );
          canvas.items.splice(spacerIndex, 1, nextField);
          canvas.items = arrayMove(
            canvas.items,
            spacerIndex,
            overData.index || 0,
          );
        }
      });
    }
    setSidebarFieldsRegenKey(Date.now());
    cleanUp();
  };

  // -----------------------------------------------------------------드래그 관리 끝

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
          <Grid container spacing={1} border={3}>
            <Grid
              key="mainCanvas"
              item
              lg={12}
              xs={12}
              sm={12}
              marginBottom={10}
            >
              <Box
                sx={{
                  border: 1,
                  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.5)', // 쉐도우 효과 추가
                }}
                height={50}
                onClick={handleHeaderSelect}
              >
                헤더 영역
              </Box>
            </Grid>

            <Grid item lg={12} xs={12} sm={12}>
              {canvases.map(canvas => (
                <SortableContext
                  key={canvas.canvasId}
                  strategy={verticalListSortingStrategy}
                  items={canvas.items.map(d => d.dragId)}
                >
                  <BuilderCanvas
                    key={canvas.canvasId}
                    items={canvas.items}
                    canvasId={canvas.canvasId}
                    selectedItemId={selectedItemId}
                    setSelectedItemId={setSelectedItemId}
                    selectedCanvasId={selectedCanvasId}
                    setSelectedCanvasId={setSelectedCanvasId}
                    onDelete={id =>
                      setCanvases(draft => {
                        const selectedCanvas = draft.find(
                          c => c.canvasId === canvas.canvasId,
                        );
                        if (selectedCanvas) {
                          selectedCanvas.items = selectedCanvas.items.filter(
                            item => item.dragId !== id,
                          );
                        }
                      })
                    }
                  />
                </SortableContext>
              ))}
            </Grid>

            <Grid item lg={12} xs={12} sm={12} marginTop={10}>
              <Box
                sx={{
                  border: 1,
                  boxShadow: '0 8px 12px rgba(0, 0, 0, 0.5)', // 쉐도우 효과 추가
                }}
                height={50}
                onClick={handleFooterSelect}
              >
                푸터 영역
              </Box>
            </Grid>
          </Grid>

          <Box
            sx={{
              height: '20vh', // Viewport height 100%
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Button
              onClick={addCanvas}
              variant="contained"
              color="primary"
              startIcon={<AddCircleRoundedIcon />}
            >
              Add Canvas
            </Button>
          </Box>
        </Box>

        {
          // 사이드바 활성화 버튼
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
          // 사이드바 영역
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
          <Button onClick={handleSideBar}>Close</Button>
          <BuilderSidebar fieldsRegKey={sidebarFieldsRegenKey} />
        </Drawer>

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
