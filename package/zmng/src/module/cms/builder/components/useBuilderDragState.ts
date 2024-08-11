import {
  DragEndEvent,
  DragOverEvent,
  DragStartEvent,
  UniqueIdentifier,
  Over,
} from '@dnd-kit/core';
import { useRef, useState } from 'react';
import { BuilderItemsProps } from '@module/cms/builder/components/BuilderItem';
import { useImmer } from 'use-immer';
import { arrayMove } from '@dnd-kit/sortable';

interface CanvasesProps {
  canvasId: UniqueIdentifier;
  items: BuilderItemsProps[];
}

export function useBuilderDragState() {
  // 전체적인 캔버스 및 아이템 상태관리
  const [canvases, setCanvases] = useImmer<CanvasesProps[]>([]);

  // 스페이서 아이템 참조
  const spacerInsertedRef = useRef(false);

  // 아이템이 새로운 캔버스로 이동했는지 참조
  const newCanvasMoveCheckRef = useRef(false);

  // 현재 아이템이 위치하고 있는 캔버스 ID 참조
  const currentOverCanvesIdRef = useRef<UniqueIdentifier | undefined>(
    undefined,
  );

  // 현재 드래그중인 아이템 참조
  const currentDragItemRef = useRef<BuilderItemsProps | null>(null);

  // 현재 드래그중인 캔버스 참조
  const currentDragCanvasRef = useRef<UniqueIdentifier | null>(null);

  // 사이드바에서 드래그 시작한 활성화된 아이템
  const [activeSidebarItem, setActiveSidebarItem] = useState(null);

  // 캔버스에서 드래그 시작한 활성화된 아이템
  const [activeCanvesItem, setActiveCanverItem] = useState(null);

  // 사이드바 필드리스트를 생성하기위한 키 ( 현재 사이드바의 상태키 -> 컴포넌트 사용후 고유 ID 리셋하기 위해 제어 )
  const [sidebarFieldsRegenKey, setSidebarFieldsRegenKey] = useState(
    Date.now(),
  );
  // 캔버스 클릭 여부 상태관리
  const [selectedCanvasId, setSelectedCanvasId] = useState<
    UniqueIdentifier | undefined
  >('NOT_SELECTED');

  // 아이템 클릭 여부 상태관리
  const [selectedItemId, setSelectedItemId] =
    useState<UniqueIdentifier>('NOT_SELECTED');
  // --------------------------------- 함수--------------------------
  // 아이템 제어 상태 및 참조 초기화
  const cleanUp = () => {
    setActiveSidebarItem(null);
    setActiveCanverItem(null);
    currentDragItemRef.current = null;
    spacerInsertedRef.current = false;
    currentOverCanvesIdRef.current = undefined;
  };

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

  const findCanvesArea = (over: Over | null) => {
    if (over?.data?.current?.canvasId) {
      if (currentOverCanvesIdRef.current !== over.data.current.canvasId) {
        cleanSpacer();
        if (currentOverCanvesIdRef.current !== undefined) {
          newCanvasMoveCheckRef.current = true;
        }
      }
      currentOverCanvesIdRef.current = over?.data?.current?.canvasId;
    }

    if (over?.data?.current?.item?.canvasId) {
      if (currentOverCanvesIdRef.current !== over.data.current.item.canvasId) {
        cleanSpacer();
        if (currentOverCanvesIdRef.current !== undefined) {
          newCanvasMoveCheckRef.current = true;
        }
      }
      currentOverCanvesIdRef.current = over.data.current.item.canvasId;
    }
  };

  const handleDragStartBySidebarItem = (e: DragStartEvent) => {
    const { active } = e;
    const activeData = active?.data?.current ?? {};
    const { item } = activeData;
    setActiveSidebarItem(item);
    currentDragItemRef.current = item;
  };

  const handleDragOverBySidebarItem = (e: DragOverEvent) => {
    const { active, over } = e;
    // Over 대상이 컨버스 일경우. currentOverCanvesIdRef 변경
    if (over?.data?.current?.canvasId) {
      // 캔버스 참조값 비교하여 스페이서 객체 초기화 및 참조값 변경
      if (currentOverCanvesIdRef.current !== over.data.current.canvasId) {
        cleanSpacer();
      }
      currentOverCanvesIdRef.current = over?.data?.current?.canvasId;
    }

    // 마우스 위치 대상이 아이템 일경우 아이템의 캔버스로 참조값 변경.
    if (over?.data?.current?.item?.canvasId) {
      if (currentOverCanvesIdRef.current !== over.data.current.item.canvasId) {
        cleanSpacer();
      }
      currentOverCanvesIdRef.current = over.data.current.item.canvasId;
    }

    // 사이드바 아이템이 캔버스위로 이동하는것을 감지할경우
    // 스페이서 접미사가 있는 사이드바 아이템 id를 이용해서 스페이서를 생성후 캔버스에 렌더링될수있도록 배열에 값을 저장.
    // 배열에 객체 생성시작.

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
  };

  const handleDragEndBySidebarItem = (e: DragEndEvent) => {
    const { over } = e;
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

  const handleDragStartCanvasItem = (e: DragStartEvent) => {
    const { active } = e;
    const activeData = active?.data?.current ?? {};

    // 캔버스의 아이템일 경우 실제 아이템 복사대신 공백만 생성해서 삽입 & 캔버스 아이템의 캔버스 ID를 기본으로 세팅
    newCanvasMoveCheckRef.current = false;
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

  const handleDragOverCanvasItem = (e: DragOverEvent) => {
    const { active, over } = e;

    // Over 대상이 컨버스 일경우. currentOverCanvesIdRef 변경

    findCanvesArea(over);

    const overData = over?.data?.current ?? {};

    if (newCanvasMoveCheckRef.current) {
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
      }

      if (over) {
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
      } else {
        cleanSpacer();
        currentOverCanvesIdRef.current = undefined;
      }
    }
  };

  const handleDragEndCanvasItem = (e: DragEndEvent) => {
    const { over } = e;
    if (!over) {
      cleanUp();
      cleanSpacer();
      return;
    }
    // 실제 들어갈 Item
    const nextField = {
      ...currentDragItemRef.current!,
      canvasId: currentOverCanvesIdRef.current,
    };

    if (nextField) {
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

  const handleDragStartCanvas = (e: DragStartEvent) => {
    const { active } = e;
    const canvasId = active?.id ?? null;

    // 현재 드래그 중인 캔버스 ID 저장
    currentDragCanvasRef.current = canvasId;
  };

  const handleDragOverCanvas = (e: DragOverEvent) => {
    const { over } = e;
    const dragFrom = over?.data?.current?.dragFrom ?? -1;

    console.log(dragFrom);
    // 위치변경 대상 캔버스 가져온다.
  };

  const handleDragEndCanvas = (e: DragEndEvent) => {
    console.log('testdata');
  };

  const handleDragStart = (e: DragStartEvent) => {
    const { active } = e;
    const dragFrom = active?.data?.current?.dragFrom ?? {};

    // 사이드바 아이템이 캔버스위로 이동하는것을 감지할경우
    // 스페이서 접미사가 있는 사이드바 아이템 id를 이용해서 스페이서를 생성후 캔버스에 렌더링될수있도록 배열에 값을 저장.
    // 배열에 객체 생성시작.

    if (dragFrom === 'mainCanvas') {
      return;
      handleDragStartCanvas(e);
    } else if (dragFrom === 'sidebar') {
      handleDragStartBySidebarItem(e);
    } else if (dragFrom === 'canvas') {
      handleDragStartCanvasItem(e);
    }
  };

  // 드래그중일때.
  const handleDragOver = (e: DragOverEvent) => {
    const { active } = e;
    const dragFrom = active?.data?.current?.dragFrom ?? {};

    // 사이드바 아이템이 캔버스위로 이동하는것을 감지할경우
    // 스페이서 접미사가 있는 사이드바 아이템 id를 이용해서 스페이서를 생성후 캔버스에 렌더링될수있도록 배열에 값을 저장.
    // 배열에 객체 생성시작.

    if (dragFrom === 'mainCanvas') {
      return;
      handleDragOverCanvas(e);
    } else if (dragFrom === 'sidebar') {
      handleDragOverBySidebarItem(e);
    } else {
      handleDragOverCanvasItem(e);
    }
  };

  // 드래그 종료시
  const handleDragEnd = (e: DragEndEvent) => {
    const { active } = e;
    const dragFrom = active?.data?.current?.dragFrom ?? {};
    if (dragFrom === 'mainCanvas') {
      handleDragEndCanvas(e);
    } else if (dragFrom === 'sidebar') {
      handleDragEndBySidebarItem(e);
    } else {
      handleDragEndCanvasItem(e);
    }
  };

  return {
    canvases,
    activeSidebarItem,
    activeCanvesItem,
    sidebarFieldsRegenKey,
    selectedItemId,
    selectedCanvasId,
    setSelectedCanvasId,
    setSelectedItemId,
    handleDragStart,
    handleDragOver,
    handleDragEnd,
    addCanvas,
    setCanvases,
    removeCanvas,
    handleDragStartBySidebarItem,
    handleDragOverBySidebarItem,
    handleDragEndBySidebarItem,
  };
}
