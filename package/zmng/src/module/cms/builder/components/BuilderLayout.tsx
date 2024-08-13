import React, { useState } from 'react';
import {
  CssBaseline,
  Box,
  IconButton,
  Drawer,
  Button,
  Grid,
} from '@mui/material';
import AddCircleRoundedIcon from '@mui/icons-material/AddCircleRounded';
import BuilderCanvas from '@module/cms/builder/components/BuilderCanvas';
import BuilderSidebar, {
  SideBarItem,
} from '@module/cms/builder/components/BuilderSideBar';

import { useBuilderDragState } from '@module/cms/builder/components/useBuilderDragState';
import { DndContext, DragOverlay } from '@dnd-kit/core';

import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import BuilderSettingBar from '@module/cms/builder/components/BuilderSettingBar';
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
  const {
    canvases,
    activeSidebarItem,
    activeCanvesItem,
    sidebarFieldsRegenKey,
    selectedItemId,
    selectedCanvasId,
    setSelectedCanvasId,
    setSelectedItemId,
    continerUpdate,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    addCanvas,
    setCanvases,
  } = useBuilderDragState();

  // 사이드바 관리
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // 사이드바 오픈
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
              <SortableContext
                strategy={verticalListSortingStrategy}
                items={canvases.map(d => d.canvasId)}
              >
                {canvases.map(canvas => (
                  <BuilderCanvas
                    key={canvas.canvasId}
                    items={canvas.items}
                    canvas={canvas}
                    continerUpdate={continerUpdate}
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
                ))}
              </SortableContext>
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
